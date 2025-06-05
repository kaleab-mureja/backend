const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Link to the User model
        required: true,
        ref: 'User' // Reference the User model
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        default: null // Can be null if no due date
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'], // Enforce specific values
        default: 'Medium'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;