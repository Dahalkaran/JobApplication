const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware.authenticateToken, noteController.addNote);
router.get('/:jobId', authMiddleware.authenticateToken, noteController.getNotes);

module.exports = router;
