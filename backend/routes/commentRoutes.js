const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  addComment,
  getComments,
  deleteComment,
} = require('../controllers/commentController');
const { authenticate } = require('../middleware/auth');

// Validation rules
const commentValidation = [
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Comment text is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters'),
];

// Routes
router.post('/:problemId/comments', authenticate, commentValidation, addComment);
router.get('/:problemId/comments', getComments);
router.delete('/comments/:id', authenticate, deleteComment);

module.exports = router;

