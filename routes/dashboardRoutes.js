const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.get('/overview', authMiddleware.authenticateToken, dashboardController.getDashboardData);
router.get('/applications', authMiddleware.authenticateToken, dashboardController.getApplications);
router.get('/chart', authMiddleware.authenticateToken, dashboardController.getChartData);
router.get('/applications/:id', authMiddleware.authenticateToken, dashboardController.getApplicationById);
router.delete('/applications/:id', authMiddleware.authenticateToken, dashboardController.deleteApplication);

module.exports = router;
