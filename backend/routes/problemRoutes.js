const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblemStatus,
  deleteProblem,
} = require('../controllers/problemController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Validation rules
const createProblemValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Location must be between 3 and 200 characters'),
];

// Routes
router.post('/', authenticate, upload.single('image'), createProblemValidation, createProblem);
router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.put('/:id/status', authenticate, updateProblemStatus);
router.delete('/:id', authenticate, deleteProblem);

module.exports = router;

