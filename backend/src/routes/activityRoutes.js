const express = require('express');
const router = express.Router();
const { getActivityCalendar } = require('../controllers/activityController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Get activity calendar data for the user
router.get('/calendar', getActivityCalendar);

module.exports = router;