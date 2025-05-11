const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByProject
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Get all tasks & Create a new task
router.route('/')
  .get(getTasks)
  .post(createTask);

// Get tasks by project ID
router.get('/project/:projectId', getTasksByProject);

// Get, update, and delete a task by ID
router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;