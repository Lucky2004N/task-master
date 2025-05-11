const { FocusSession, UserWallet, User, Task } = require('../models');
const { recordUserActivity } = require('./activityController');

/**
 * Start a new focus session
 * @route POST /api/focus/start
 * @access Private
 */
const startFocusSession = async (req, res) => {
  try {
    const { duration, taskId } = req.body;
    
    if (!duration || duration < 1) {
      return res.status(400).json({ message: 'Please provide a valid duration in minutes' });
    }
    
    // Check if there's already an active session
    const activeSession = await FocusSession.findOne({
      where: {
        userId: req.user.id,
        completed: false,
        endTime: null
      }
    });
    
    if (activeSession) {
      return res.status(400).json({ 
        message: 'You already have an active focus session',
        session: activeSession
      });
    }
    
    // Create new focus session
    const session = await FocusSession.create({
      userId: req.user.id,
      startTime: new Date(),
      duration,
      taskId: taskId || null
    });
    
    res.status(201).json({
      message: 'Focus session started',
      session
    });
  } catch (error) {
    console.error('Error starting focus session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Complete a focus session
 * @route PUT /api/focus/:id/complete
 * @access Private
 */
const completeFocusSession = async (req, res) => {
  try {
    const session = await FocusSession.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
        completed: false
      }
    });
    
    if (!session) {
      return res.status(404).json({ message: 'Focus session not found or already completed' });
    }
    
    // Calculate e-coins based on duration (1 e-coin per 5 minutes)
    const eCoinsEarned = Math.floor(session.duration / 5);
    
    // Update session
    session.completed = true;
    session.endTime = new Date();
    session.eCoinsEarned = eCoinsEarned;
    await session.save();
    
    // Update user wallet
    let wallet = await UserWallet.findOne({ where: { userId: req.user.id } });
    
    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = await UserWallet.create({
        userId: req.user.id,
        eCoins: eCoinsEarned,
        lifetimeEarned: eCoinsEarned
      });
    } else {
      // Update existing wallet
      wallet.eCoins += eCoinsEarned;
      wallet.lifetimeEarned += eCoinsEarned;
      await wallet.save();
    }
    
    // Record activity for streak calendar
    await recordUserActivity(req.user.id, 'focus_session', session.duration);
    
    res.json({
      message: 'Focus session completed',
      session,
      eCoinsEarned,
      wallet: {
        eCoins: wallet.eCoins,
        lifetimeEarned: wallet.lifetimeEarned
      }
    });
  } catch (error) {
    console.error('Error completing focus session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Cancel a focus session
 * @route PUT /api/focus/:id/cancel
 * @access Private
 */
const cancelFocusSession = async (req, res) => {
  try {
    const session = await FocusSession.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
        completed: false
      }
    });
    
    if (!session) {
      return res.status(404).json({ message: 'Focus session not found or already completed' });
    }
    
    // Delete the session
    await session.destroy();
    
    res.json({ message: 'Focus session cancelled' });
  } catch (error) {
    console.error('Error cancelling focus session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get user's focus sessions
 * @route GET /api/focus
 * @access Private
 */
const getFocusSessions = async (req, res) => {
  try {
    const sessions = await FocusSession.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Task,
          as: 'task',
          attributes: ['id', 'title']
        }
      ],
      order: [['startTime', 'DESC']]
    });
    
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching focus sessions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get user's wallet information
 * @route GET /api/focus/wallet
 * @access Private
 */
const getUserWallet = async (req, res) => {
  try {
    let wallet = await UserWallet.findOne({ where: { userId: req.user.id } });
    
    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = await UserWallet.create({
        userId: req.user.id,
        eCoins: 0,
        lifetimeEarned: 0
      });
    }
    
    res.json(wallet);
  } catch (error) {
    console.error('Error fetching user wallet:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  startFocusSession,
  completeFocusSession,
  cancelFocusSession,
  getFocusSessions,
  getUserWallet
};