const express = require('express');
const router = express.Router();
const {
  submitResponse,
  getResponsesByPoll,
  deleteResponse,
} = require('../controllers/responseController');
const { authenticate, optional } = require('../middleware/auth');

// Public route - submit response
router.post('/:pollId/submit', optional, submitResponse);

// Protected routes
router.get('/:pollId', authenticate, getResponsesByPoll);
router.delete('/:responseId', authenticate, deleteResponse);

module.exports = router;
