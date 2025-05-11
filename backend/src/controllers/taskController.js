const { Task, Project, User } = require('../models');
const { createTaskPendingNotification } = require('./notificationController');

/**
 * Get all tasks for the logged-in user
 * @route GET /api/tasks
 * @access Private
 */
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get a single task by ID
 * @route GET /api/tasks/:id
 * @access Private
 */
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create a new task
 * @route POST /api/tasks
 * @access Private
 */
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, projectId } = req.body;

    // Create the task
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      userId: req.user.id
    });

    // Create a notification for the new task
    await createTaskPendingNotification(task, req.user.id);
    
    // Record task creation activity for streak calendar
    const { recordUserActivity } = require('./activityController');
    await recordUserActivity(req.user.id, 'task_created');

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update a task
 * @route PUT /api/tasks/:id
 * @access Private
 */
const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, projectId } = req.body;

    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if status is being updated to completed
    const wasCompleted = task.status === 'completed';
    const isNowCompleted = status === 'completed';
    
    // Update task fields
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
    task.projectId = projectId !== undefined ? projectId : task.projectId;

    await task.save();
    
    // If task was just marked as completed, record the activity
    if (!wasCompleted && isNowCompleted) {
      const { recordUserActivity } = require('./activityController');
      await recordUserActivity(req.user.id, 'task_completed');
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete a task
 * @route DELETE /api/tasks/:id
 * @access Private
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get tasks by project ID
 * @route GET /api/tasks/project/:projectId
 * @access Private
 */
const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        projectId: req.params.projectId,
        userId: req.user.id
      },
      order: [['createdAt', 'DESC']]
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks by project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByProject
};