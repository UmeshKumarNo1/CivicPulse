const express = require('express');
const router = express.Router();
const {
  toggleUpvote,
  getUpvoteStatus,
} = require('../controllers/upvoteController');
const { authenticate } = require('../middleware/auth');

// Routes
router.post('/:problemId/upvote', authenticate, toggleUpvote);
router.get('/:problemId/upvote/status', authenticate, getUpvoteStatus);

module.exports = router;

