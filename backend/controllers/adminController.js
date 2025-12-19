const { User, Problem, Comment } = require('../models');
const fs = require('fs');
const path = require('path');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      count: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users.',
      error: error.message,
    });
  }
};

// @desc    Block/Unblock a user
// @route   PUT /api/admin/users/:id/block
// @access  Private (Admin only)
const toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Prevent admin from blocking themselves
    if (user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot block yourself.',
      });
    }

    // Toggle block status
    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully.`,
      data: {
        user: user.toJSON(),
      },
    });
  } catch (error) {
    console.error('Toggle block user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while blocking/unblocking user.',
      error: error.message,
    });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Prevent admin from deleting themselves
    if (user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete yourself.',
      });
    }

    // Delete user (cascade will delete related problems, comments, upvotes)
    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully.',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user.',
      error: error.message,
    });
  }
};

// @desc    Get all problems (admin view with more details)
// @route   GET /api/admin/problems
// @access  Private (Admin only)
const getAllProblemsAdmin = async (req, res) => {
  try {
    const problems = await Problem.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      count: problems.length,
      data: {
        problems,
      },
    });
  } catch (error) {
    console.error('Get all problems admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching problems.',
      error: error.message,
    });
  }
};

// @desc    Delete any problem (admin)
// @route   DELETE /api/admin/problems/:id
// @access  Private (Admin only)
const deleteProblemAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findByPk(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
      });
    }

    // Delete image file if exists
    if (problem.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', problem.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete problem
    await problem.destroy();

    res.status(200).json({
      success: true,
      message: 'Problem deleted successfully.',
    });
  } catch (error) {
    console.error('Delete problem admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting problem.',
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  toggleBlockUser,
  deleteUser,
  getAllProblemsAdmin,
  deleteProblemAdmin,
};

