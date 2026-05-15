const express = require('express');
const router = express.Router();
const {
  getAnalytics,
  getPublicAnalytics,
} = require('../controllers/analyticsController');
const { authenticate, optional } = require('../middleware/auth');

// Public route - get published analytics
router.get('/public/:shareUrl', optional, getPublicAnalytics);

// Protected routes
router.get('/:pollId', authenticate, getAnalytics);

module.exports = router;
