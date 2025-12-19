const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  toggleBlockUser,
  deleteUser,
  getAllProblemsAdmin,
  deleteProblemAdmin,
} = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middleware/auth');

// All routes require authentication and admin role
router.use(authenticate);
router.use(isAdmin);

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id/block', toggleBlockUser);
router.delete('/users/:id', deleteUser);

// Problem management routes
router.get('/problems', getAllProblemsAdmin);
router.delete('/problems/:id', deleteProblemAdmin);

module.exports = router;

