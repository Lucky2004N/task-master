const { Task, User } = require('../models');
const { Op } = require('sequelize');
const { 
  createTaskPendingNotification, 
  createTaskDueSoonNotification, 
  createTaskOverdueNotification 
} = require('../controllers/notificationController');

/**
 * Check for pending tasks and create notifications
 */
const checkPendingTasks = async () => {
  try {
    // Get all tasks that are not completed
    const pendingTasks = await Task.findAll({
      where: {
        status: {
          [Op.ne]: 'completed'
        }
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    console.log(`Found ${pendingTasks.length} pending tasks`);

    // Process each pending task
    for (const task of pendingTasks) {
      // Create a pending task notification with a random motivational quote
      await createTaskPendingNotification(task, task.user.id);
    }
  } catch (error) {
    console.error('Error checking pending tasks:', error);
  }
};

/**
 * Check for tasks due soon and create notifications
 */
const checkTasksDueSoon = async () => {
  try {
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);
    
    // Get all tasks due within the next 3 days that are not completed
    const tasksDueSoon = await Task.findAll({
      where: {
        status: {
          [Op.ne]: 'completed'
        },
        dueDate: {
          [Op.between]: [today, threeDaysFromNow]
        }
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    console.log(`Found ${tasksDueSoon.length} tasks due soon`);

    // Process each task due soon
    for (const task of tasksDueSoon) {
      const dueDate = new Date(task.dueDate);
      const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      
      // Create a task due soon notification with a random motivational quote
      await createTaskDueSoonNotification(task, task.user.id, daysUntilDue);
    }
  } catch (error) {
    console.error('Error checking tasks due soon:', error);
  }
};

/**
 * Check for overdue tasks and create notifications
 */
const checkOverdueTasks = async () => {
  try {
    const today = new Date();
    
    // Get all tasks that are overdue and not completed
    const overdueTasks = await Task.findAll({
      where: {
        status: {
          [Op.ne]: 'completed'
        },
        dueDate: {
          [Op.lt]: today
        }
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    console.log(`Found ${overdueTasks.length} overdue tasks`);

    // Process each overdue task
    for (const task of overdueTasks) {
      // Create an overdue task notification with a random motivational quote
      await createTaskOverdueNotification(task, task.user.id);
    }
  } catch (error) {
    console.error('Error checking overdue tasks:', error);
  }
};

/**
 * Run all notification checks
 */
const runNotificationChecks = async () => {
  console.log('Running notification checks...');
  await checkPendingTasks();
  await checkTasksDueSoon();
  await checkOverdueTasks();
  console.log('Notification checks completed');
};

module.exports = {
  runNotificationChecks,
  checkPendingTasks,
  checkTasksDueSoon,
  checkOverdueTasks
};