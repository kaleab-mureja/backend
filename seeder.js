const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/sampleUsers');
const tasks = require('./data/sampleTasks');
const User = require('./models/User');
const Task = require('./models/Task');
const connectDB = require('./config/db'); // Use the same DB connection logic

dotenv.config(); // Load environment variables

// Connect to DB
connectDB();

const importData = async () => {
    try {
        // Clear existing data first
        await Task.deleteMany();
        await User.deleteMany();
        console.log('Existing data cleared!');

        // 1. Import Users
        const createdUsers = await User.insertMany(users);
        console.log('Users imported!');

        // Create a map from username to actual user ID
        const userMap = {};
        createdUsers.forEach(user => {
            userMap[user.username] = user._id;
        });

        // 2. Map tasks to the imported user IDs
        const sampleTasksWithUsers = tasks.map(task => {
            if (!userMap[task.userRef]) {
                console.warn(`User reference '${task.userRef}' not found for task '${task.title}'`);
                return null; // Skip tasks without a valid userRef
            }
            const { userRef, ...rest } = task; // Destructure to remove userRef
            return {
                ...rest,
                user: userMap[userRef] // Assign the actual MongoDB user ID
            };
        }).filter(task => task !== null); // Filter out tasks with invalid userRef

        // 3. Import Tasks
        if (sampleTasksWithUsers.length > 0) {
            await Task.insertMany(sampleTasksWithUsers);
            console.log('Tasks imported!');
        } else {
            console.log('No tasks to import or all tasks had invalid user references.');
        }


        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Task.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error destroying data: ${error.message}`);
        process.exit(1);
    }
};

// Check command line arguments to determine action
if (process.argv[2] === '-d' || process.argv[2] === '--destroy') {
    destroyData();
} else {
    importData();
}