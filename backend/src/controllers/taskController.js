const { Task, Project } = require('../models');
const { Op } = require('sequelize');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, projectId } = req.body;

    // Check if project exists and belongs to user if projectId is provided
    if (projectId) {
      const project = await Project.findOne({
        where: { id: projectId, userId: req.user.id }
      });

      if (!project) {
        return res.status(404).json({ message: 'Project not found or not authorized' });
      }
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      projectId,
      userId: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status, priority, projectId, search, sortBy, sortOrder } = req.query;
    
    // Build filter object
    const filter = { userId: req.user.id };
    
    // Add status filter if provided
    if (status) {
      filter.status = status;
    }
    
    // Add priority filter if provided
    if (priority) {
      filter.priority = priority;
    }
    
    // Add project filter if provided
    if (projectId) {
      filter.projectId = projectId;
    }
    
    // Add search filter if provided
    if (search) {
      filter[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    // Build sort options
    const order = [];
    if (sortBy) {
      order.push([sortBy, sortOrder === 'desc' ? 'DESC' : 'ASC']);
    } else {
      // Default sort by createdAt desc
      order.push(['createdAt', 'DESC']);
    }
    
    const tasks = await Task.findAll({
      where: filter,
      order,
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name', 'color']
        }
      ]
    });
    
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a task by ID
// @route   GET /api/tasks/:id
// @access  Private
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
          attributes: ['id', 'name', 'color']
        }
      ]
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
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

    // Check if project exists and belongs to user if projectId is provided
    if (req.body.projectId) {
      const project = await Project.findOne({
        where: { id: req.body.projectId, userId: req.user.id }
      });

      if (!project) {
        return res.status(404).json({ message: 'Project not found or not authorized' });
      }
    }

    // Update task fields
    const { title, description, status, priority, dueDate, projectId } = req.body;
    
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
    task.projectId = projectId !== undefined ? projectId : task.projectId;
    
    // If status is changed to completed, set completedAt
    if (status === 'completed' && task.status !== 'completed') {
      task.completedAt = new Date();
    } else if (status !== 'completed') {
      task.completedAt = null;
    }

    await task.save();
    
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
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
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};