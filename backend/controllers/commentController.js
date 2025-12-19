const { Comment, User, Problem } = require('../models');
const { validationResult } = require('express-validator');

// @desc    Add a comment to a problem
// @route   POST /api/problems/:problemId/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { problemId } = req.params;
    const { text } = req.body;

    // Check if problem exists
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
      });
    }

    // Create comment
    const comment = await Comment.create({
      text,
      userId: req.user.id,
      problemId,
    });

    // Fetch comment with user details
    const commentWithUser = await Comment.findByPk(comment.id, {
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
      message: 'Comment added successfully.',
      data: {
        comment: commentWithUser,
      },
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding comment.',
      error: error.message,
    });
  }
};

// @desc    Get all comments for a problem
// @route   GET /api/problems/:problemId/comments
// @access  Public
const getComments = async (req, res) => {
  try {
    const { problemId } = req.params;

    // Check if problem exists
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
      });
    }

    // Fetch comments
    const comments = await Comment.findAll({
      where: { problemId },
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
      count: comments.length,
      data: {
        comments,
      },
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching comments.',
      error: error.message,
    });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private (Admin or Comment Owner)
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found.',
      });
    }

    // Check if user is admin or comment owner
    if (req.user.role !== 'admin' && comment.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this comment.',
      });
    }

    await comment.destroy();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully.',
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting comment.',
      error: error.message,
    });
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};

