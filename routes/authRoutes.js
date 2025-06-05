const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.registerUser);

// Authenticate user and get token
router.post('/login', authController.loginUser);

module.exports = router;