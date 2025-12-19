const { Problem, User, Comment, Upvote } = require('../models');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

// @desc    Create a new problem
// @route   POST /api/problems
// @access  Private
const createProblem = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Delete uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, description, location } = req.body;
    const image = req.file ? req.file.filename : null;

    // Create problem
    const problem = await Problem.create({
      title,
      description,
      location,
      image,
      userId: req.user.id,
    });

    // Fetch problem with user details
    const problemWithUser = await Problem.findByPk(problem.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Problem created successfully.',
      data: {
        problem: problemWithUser,
      },
    });
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Create problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating problem.',
      error: error.message,
    });
  }
};

// @desc    Get all problems
// @route   GET /api/problems
// @access  Public
const getAllProblems = async (req, res) => {
  try {
    const { status, location, sort = 'createdAt', order = 'DESC' } = req.query;

    // Build filter
    const where = {};
    if (status) where.status = status;
    if (location) where.location = { [require('sequelize').Op.like]: `%${location}%` };

    // Fetch problems
    const problems = await Problem.findAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Upvote,
          as: 'upvotes',
          attributes: ['id'],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id'],
        },
      ],
      order: [[sort, order]],
    });

    // Add upvote count to each problem
    const problemsWithCounts = problems.map(problem => {
      const problemData = problem.toJSON();
      problemData.upvoteCount = problemData.upvotes ? problemData.upvotes.length : 0;
      problemData.commentCount = problemData.comments ? problemData.comments.length : 0;
      delete problemData.upvotes;
      delete problemData.comments;
      return problemData;
    });

    res.status(200).json({
      success: true,
      count: problemsWithCounts.length,
      data: {
        problems: problemsWithCounts,
      },
    });
  } catch (error) {
    console.error('Get all problems error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching problems.',
      error: error.message,
    });
  }
};

// @desc    Get single problem by ID
// @route   GET /api/problems/:id
// @access  Public
const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name'],
            },
          ],
          order: [['createdAt', 'DESC']],
        },
        {
          model: Upvote,
          as: 'upvotes',
          attributes: ['id', 'userId'],
        },
      ],
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
      });
    }

    // Add upvote count
    const problemData = problem.toJSON();
    problemData.upvoteCount = problemData.upvotes ? problemData.upvotes.length : 0;

    res.status(200).json({
      success: true,
      data: {
        problem: problemData,
      },
    });
  } catch (error) {
    console.error('Get problem by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching problem.',
      error: error.message,
    });
  }
};

// @desc    Update problem status
// @route   PUT /api/problems/:id/status
// @access  Private (Admin or Problem Owner)
const updateProblemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'In Progress', 'Resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: Pending, In Progress, Resolved',
      });
    }

    const problem = await Problem.findByPk(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
      });
    }

    // Check if user is admin or problem owner
    if (req.user.role !== 'admin' && problem.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this problem.',
      });
    }

    // Update status
    problem.status = status;
    await problem.save();

    res.status(200).json({
      success: true,
      message: 'Problem status updated successfully.',
      data: {
        problem,
      },
    });
  } catch (error) {
    console.error('Update problem status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating problem status.',
      error: error.message,
    });
  }
};

// @desc    Delete a problem
// @route   DELETE /api/problems/:id
// @access  Private (Admin or Problem Owner)
const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findByPk(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
      });
    }

    // Check if user is admin or problem owner
    if (req.user.role !== 'admin' && problem.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this problem.',
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
    console.error('Delete problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting problem.',
      error: error.message,
    });
  }
};

module.exports = {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblemStatus,
  deleteProblem,
};

