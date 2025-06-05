// backend/routes/devRoutes.js
const express = require('express');
const router = express.Router();
const devController = require('../controllers/devController');
const { protect } = require('../middleware/authMiddleware'); // Optional: protect dev routes too

// router.use(protect);

// Endpoint to seed the database with sample data
router.post('/seed-db', devController.seedDatabase);

// Endpoint to destroy all database data
router.post('/destroy-db', devController.destroyDatabase);

module.exports = router;