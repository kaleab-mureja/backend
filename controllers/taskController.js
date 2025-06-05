const Task = require('../models/Task');
const Joi = require('joi');

// Joi schema for task creation validation
const createTaskSchema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().allow('').optional(), // Optional description
    dueDate: Joi.date().allow(null).optional(),    // Optional date, can be null
    priority: Joi.string().valid('Low', 'Medium', 'High').optional().default('Medium') // Optional, with enum
});

// Joi schema for task update validation
const updateTaskSchema = Joi.object({
    title: Joi.string().min(1).optional(),
    description: Joi.string().allow('').optional(),
    completed: Joi.boolean().optional(),
    dueDate: Joi.date().allow(null).optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional()
}).min(1); // At least one field must be provided for update

/**
 * @route GET /api/tasks
 * @desc Get all tasks for the authenticated user, with optional filtering.
 * @access Private
 */
exports.getTasks = async (req, res) => {
    try {
        const { completed } = req.query;
        let query = { user: req.user._id }; // Crucial: Only get tasks for the logged-in user

        if (completed !== undefined) {
            query.completed = completed.toLowerCase() === 'true';
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 }); // Sort by creation date descending
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching tasks', error: error.message });
    }
};

/**
 * @route GET /api/tasks/:id
 * @desc Get a single task by ID for the authenticated user.
 * @access Private
 */
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not owned by user' });
        }
        res.json(task);
    } catch (error) {
        // Handle invalid MongoDB ID format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid task ID format' });
        }
        res.status(500).json({ message: 'Server error fetching task', error: error.message });
    }
};

/**
 * @route POST /api/tasks
 * @desc Create a new task for the authenticated user.
 * @access Private
 */
exports.createTask = async (req, res) => {
    // Validate request body
    const { error } = createTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, dueDate, priority } = req.body;

    try {
        const task = new Task({
            user: req.user._id, // Assign task to the authenticated user
            title,
            description,
            dueDate,
            priority
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error creating task', error: error.message });
    }
};

/**
 * @route PUT /api/tasks/:id
 * @desc Update a task for the authenticated user.
 * @access Private
 */
exports.updateTask = async (req, res) => {
    // Validate request body
    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, completed, dueDate, priority } = req.body;

    try {
        let task = await Task.findOne({ _id: req.params.id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not owned by user' });
        }

        // Update fields only if they are provided in the request body
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (completed !== undefined) task.completed = completed;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (priority !== undefined) task.priority = priority;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid task ID format' });
        }
        res.status(500).json({ message: 'Server error updating task', error: error.message });
    }
};

/**
 * @route DELETE /api/tasks/:id
 * @desc Delete a task for the authenticated user.
 * @access Private
 */
exports.deleteTask = async (req, res) => {
    try {
        const result = await Task.deleteOne({ _id: req.params.id, user: req.user._id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Task not found or not owned by user' });
        }
        res.status(204).send(); // No content for successful deletion
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid task ID format' });
        }
        res.status(500).json({ message: 'Server error deleting task', error: error.message });
    }
};