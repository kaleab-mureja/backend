const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware'); // Import our protection middleware

// All routes below this will use the `protect` middleware
router.use(protect);

// Get all tasks for the authenticated user
router.get('/', taskController.getTasks);

// Get a single task by ID for the authenticated user
router.get('/:id', taskController.getTaskById);

// Create a new task for the authenticated user
router.post('/', taskController.createTask);

// Update a task for the authenticated user
router.put('/:id', taskController.updateTask);

// Delete a task for the authenticated user
router.delete('/:id', taskController.deleteTask);

module.exports = router;