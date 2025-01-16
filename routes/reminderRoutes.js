const express = require('express');
const reminderController = require('../controllers/reminderController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware.authenticateToken, reminderController.createReminder);

module.exports = router;
