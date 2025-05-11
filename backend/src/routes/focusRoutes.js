const express = require('express');
const router = express.Router();
const { 
  startFocusSession, 
  completeFocusSession, 
  cancelFocusSession, 
  getFocusSessions,
  getUserWallet
} = require('../controllers/focusController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Start a new focus session
router.post('/start', startFocusSession);

// Get all focus sessions for the user
router.get('/', getFocusSessions);

// Complete a focus session
router.put('/:id/complete', completeFocusSession);

// Cancel a focus session
router.put('/:id/cancel', cancelFocusSession);

// Get user's wallet information
router.get('/wallet', getUserWallet);

module.exports = router;