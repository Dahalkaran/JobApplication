const express = require('express');
const jobController = require('../controllers/jobController');
const authMiddleware = require('../Middleware/authMiddleware');
const uploadMiddleware = require('../Middleware/uploadMiddleware'); // Import correctly

const router = express.Router();

// Define route for creating a job application
router.post(
  '/create',
  authMiddleware.authenticateToken, // Authentication middleware
  uploadMiddleware.upload.single('file'), // Multer middleware
  jobController.createJobApplication // Controller function
);

module.exports = router;
