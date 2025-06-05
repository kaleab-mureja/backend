const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const devRoutes = require('./routes/devRoutes'); // NEW: Import dev routes

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic route for API status
app.get('/', (req, res) => {
    res.send('<h1>Advanced Task Manager API is Running!</h1><p>Register and Login via /api/auth. Manage tasks via /api/tasks.</p>');
});

// Mount authentication routes
app.use('/api/auth', authRoutes);
// Mount task routes (which are protected)
app.use('/api/tasks', taskRoutes);

// NEW: Development/Testing Endpoints - ONLY ENABLE IN DEVELOPMENT
if (process.env.NODE_ENV === 'development') {
    app.use('/api/dev', devRoutes);
    console.log('Development endpoints /api/dev/seed-db and /api/dev/destroy-db are active.');
} else {
    console.log('Development endpoints are disabled (NODE_ENV is not "development").');
}


// Centralized Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Something went wrong!',
        // Only send stack trace in development
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});