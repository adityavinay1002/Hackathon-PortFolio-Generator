const express = require('express');
const router = express.Router();
const multer = require('multer');
const { parseResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');

// Multer config (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

router.post('/parse', protect, upload.single('resume'), parseResume);

module.exports = router;
