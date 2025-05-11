const { Notification, User, Task } = require('../models');
const { getRandomQuote } = require('../utils/motivationalQuotes');

/**
 * Get all notifications for a user
 * @route GET /api/notifications
 * @access Private
 */
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Task,
          as: 'task',
          attributes: ['id', 'title', 'status', 'priority', 'dueDate']
        }
      ]
    });

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Mark a notification as read
 * @route PUT /api/notifications/:id/read
 * @access Private
 */
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ message: 'Notification marked as read', notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Mark all notifications as read for a user
 * @route PUT /api/notifications/read-all
 * @access Private
 */
const markAllAsRead = async (req, res) => {
  try {
    await Notification.update(
      { isRead: true },
      { where: { userId: req.user.id, isRead: false } }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete a notification
 * @route DELETE /api/notifications/:id
 * @access Private
 */
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await notification.destroy();

    res.json({ message: 'Notification removed' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create a task pending notification
 * @param {Object} task - The task object
 * @param {String} userId - The user ID
 */
const createTaskPendingNotification = async (task, userId) => {
  try {
    const motivationalQuote = getRandomQuote();
    
    await Notification.create({
      userId,
      taskId: task.id,
      message: `Your task "${task.title}" is pending.`,
      motivationalQuote,
      type: 'task_pending'
    });
    
    console.log(`Task pending notification created for task: ${task.title}`);
  } catch (error) {
    console.error('Error creating task pending notification:', error);
  }
};

/**
 * Create a task due soon notification
 * @param {Object} task - The task object
 * @param {String} userId - The user ID
 * @param {Number} daysUntilDue - Days until the task is due
 */
const createTaskDueSoonNotification = async (task, userId, daysUntilDue) => {
  try {
    const motivationalQuote = getRandomQuote();
    
    await Notification.create({
      userId,
      taskId: task.id,
      message: `Your task "${task.title}" is due in ${daysUntilDue} day${daysUntilDue > 1 ? 's' : ''}.`,
      motivationalQuote,
      type: 'task_due_soon'
    });
    
    console.log(`Task due soon notification created for task: ${task.title}`);
  } catch (error) {
    console.error('Error creating task due soon notification:', error);
  }
};

/**
 * Create a task overdue notification
 * @param {Object} task - The task object
 * @param {String} userId - The user ID
 */
const createTaskOverdueNotification = async (task, userId) => {
  try {
    const motivationalQuote = getRandomQuote();
    
    await Notification.create({
      userId,
      taskId: task.id,
      message: `Your task "${task.title}" is overdue.`,
      motivationalQuote,
      type: 'task_overdue'
    });
    
    console.log(`Task overdue notification created for task: ${task.title}`);
  } catch (error) {
    console.error('Error creating task overdue notification:', error);
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createTaskPendingNotification,
  createTaskDueSoonNotification,
  createTaskOverdueNotification
};