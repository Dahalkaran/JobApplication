const express = require('express');
const searchController = require('../controllers/searchController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.get('/applications', authMiddleware.authenticateToken, searchController.searchApplications);

module.exports = router;
