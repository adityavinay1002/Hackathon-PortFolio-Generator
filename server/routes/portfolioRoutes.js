const express = require('express');
const { getPortfolio, updatePortfolio, getPublicPortfolio } = require('../controllers/portfolioController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/me', protect, getPortfolio);
router.put('/me', protect, updatePortfolio);
router.get('/public/:username', getPublicPortfolio);

module.exports = router;
