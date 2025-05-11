const { UserActivity, User } = require('../models');
const { Op } = require('sequelize');

/**
 * Record user activity for streak tracking
 * @param {String} userId - User ID
 * @param {String} activityType - Type of activity (login, task_created, task_completed, focus_session)
 * @param {Number} duration - Duration in minutes (for focus sessions)
 */
const recordUserActivity = async (userId, activityType, duration = null) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Check if activity already exists for today
    const existingActivity = await UserActivity.findOne({
      where: {
        userId,
        date: today,
        activityType
      }
    });
    
    if (existingActivity) {
      // Update existing activity
      existingActivity.activityCount += 1;
      if (duration && activityType === 'focus_session') {
        existingActivity.duration = (existingActivity.duration || 0) + duration;
      }
      await existingActivity.save();
    } else {
      // Create new activity
      await UserActivity.create({
        userId,
        date: today,
        activityType,
        activityCount: 1,
        duration: activityType === 'focus_session' ? duration : null
      });
    }
    
    console.log(`Activity recorded for user ${userId}: ${activityType}`);
  } catch (error) {
    console.error('Error recording user activity:', error);
  }
};

/**
 * Get user activity data for streak calendar
 * @route GET /api/activities/calendar
 * @access Private
 */
const getActivityCalendar = async (req, res) => {
  try {
    // Get activities for the past year
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    
    const activities = await UserActivity.findAll({
      where: {
        userId: req.user.id,
        date: {
          [Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
        }
      },
      order: [['date', 'ASC']]
    });
    
    // Format data for calendar display
    const calendarData = {};
    activities.forEach(activity => {
      if (!calendarData[activity.date]) {
        calendarData[activity.date] = {
          date: activity.date,
          count: 0,
          activities: {}
        };
      }
      
      calendarData[activity.date].count += activity.activityCount;
      calendarData[activity.date].activities[activity.activityType] = {
        count: activity.activityCount,
        duration: activity.duration
      };
    });
    
    // Calculate current streak
    const streak = calculateStreak(activities);
    
    res.json({
      calendarData: Object.values(calendarData),
      streak
    });
  } catch (error) {
    console.error('Error fetching activity calendar:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Calculate user's current streak
 * @param {Array} activities - User activities
 * @returns {Object} Streak information
 */
const calculateStreak = (activities) => {
  if (!activities || activities.length === 0) {
    return { current: 0, longest: 0 };
  }
  
  // Group activities by date
  const activityDates = new Set();
  activities.forEach(activity => {
    activityDates.add(activity.date);
  });
  
  const dates = Array.from(activityDates).sort();
  
  // Calculate current streak
  let currentStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  // Check if user was active today or yesterday
  if (dates.includes(today) || dates.includes(yesterday)) {
    currentStreak = 1;
    
    // Start from yesterday or the day before if today has activity
    let checkDate = dates.includes(today) ? yesterday : new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
    
    while (true) {
      if (dates.includes(checkDate)) {
        currentStreak++;
        // Move to previous day
        const prevDate = new Date(new Date(checkDate).getTime() - 86400000);
        checkDate = prevDate.toISOString().split('T')[0];
      } else {
        break;
      }
    }
  }
  
  // Calculate longest streak
  let longestStreak = 0;
  let currentRun = 0;
  
  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      currentRun = 1;
    } else {
      const currentDate = new Date(dates[i]);
      const prevDate = new Date(dates[i-1]);
      
      // Check if dates are consecutive
      const diffTime = Math.abs(currentDate - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentRun++;
      } else {
        // Reset the run
        currentRun = 1;
      }
    }
    
    longestStreak = Math.max(longestStreak, currentRun);
  }
  
  return {
    current: currentStreak,
    longest: longestStreak
  };
};

module.exports = {
  recordUserActivity,
  getActivityCalendar
};