const multer = require('multer');

// Memory storage for file upload
const storage = multer.memoryStorage();

// Configure upload settings
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

module.exports = { upload };
