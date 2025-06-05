const tasks = [
    {
        userRef: 'john_doe', // Reference to the username in sampleUsers.js
        title: 'Complete project proposal',
        description: 'Draft the initial proposal for the Q3 project.',
        completed: false,
        priority: 'High',
        dueDate: '2025-06-20'
    },
    {
        userRef: 'john_doe',
        title: 'Review team code',
        description: 'Go through pull requests from the last sprint.',
        completed: true,
        priority: 'Medium',
        dueDate: '2025-06-03'
    },
    {
        userRef: 'jane_smith',
        title: 'Prepare presentation slides',
        description: 'Create slides for the Monday meeting.',
        completed: false,
        priority: 'High',
        dueDate: '2025-06-10'
    },
    {
        userRef: 'jane_smith',
        title: 'Research new technologies',
        description: 'Explore options for microservices framework.',
        completed: false,
        priority: 'Low',
        dueDate: '2025-06-30'
    },
    {
        userRef: 'admin_user',
        title: 'Setup production server',
        description: 'Configure EC2 instance and deploy backend.',
        completed: false,
        priority: 'High',
        dueDate: '2025-06-25'
    }
];

module.exports = tasks;