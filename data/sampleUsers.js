const users = [
    {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123' // This will be hashed by Mongoose pre-save hook
    },
    {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'password123'
    },
    {
        username: 'admin_user',
        email: 'admin@example.com',
        password: 'adminpassword'
    }
];

module.exports = users;