const express = require('express');
const router = express.Router();
const {
  createPoll,
  getPollsByUser,
  getPollByShareUrl,
  getPollById,
  updatePoll,
  publishResults,
  closePoll,
  deletePoll,
} = require('../controllers/pollController');
const { authenticate, optional } = require('../middleware/auth');

// Public routes
router.get('/public/:shareUrl', optional, getPollByShareUrl);

// Protected routes
router.post('/create', authenticate, createPoll);
router.get('/my-polls', authenticate, getPollsByUser);
router.get('/:pollId', authenticate, getPollById);
router.put('/:pollId', authenticate, updatePoll);
router.put('/:pollId/publish-results', authenticate, publishResults);
router.put('/:pollId/close', authenticate, closePoll);
router.delete('/:pollId', authenticate, deletePoll);

module.exports = router;
