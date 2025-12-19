const { Upvote, Problem } = require('../models');

// @desc    Toggle upvote for a problem (upvote or remove upvote)
// @route   POST /api/problems/:problemId/upvote
// @access  Private
const toggleUpvote = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user.id;

    // Check if problem exists
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
      });
    }

    // Check if user already upvoted
    const existingUpvote = await Upvote.findOne({
      where: {
        userId,
        problemId,
      },
    });

    if (existingUpvote) {
      // Remove upvote
      await existingUpvote.destroy();

      // Get updated upvote count
      const upvoteCount = await Upvote.count({ where: { problemId } });

      return res.status(200).json({
        success: true,
        message: 'Upvote removed successfully.',
        data: {
          upvoted: false,
          upvoteCount,
        },
      });
    } else {
      // Add upvote
      await Upvote.create({
        userId,
        problemId,
      });

      // Get updated upvote count
      const upvoteCount = await Upvote.count({ where: { problemId } });

      return res.status(201).json({
        success: true,
        message: 'Problem upvoted successfully.',
        data: {
          upvoted: true,
          upvoteCount,
        },
      });
    }
  } catch (error) {
    console.error('Toggle upvote error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while toggling upvote.',
      error: error.message,
    });
  }
};

// @desc    Get upvote status for a problem
// @route   GET /api/problems/:problemId/upvote/status
// @access  Private
const getUpvoteStatus = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user.id;

    // Check if problem exists
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
      });
    }

    // Check if user upvoted
    const upvote = await Upvote.findOne({
      where: {
        userId,
        problemId,
      },
    });

    // Get total upvote count
    const upvoteCount = await Upvote.count({ where: { problemId } });

    res.status(200).json({
      success: true,
      data: {
        upvoted: !!upvote,
        upvoteCount,
      },
    });
  } catch (error) {
    console.error('Get upvote status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching upvote status.',
      error: error.message,
    });
  }
};

module.exports = {
  toggleUpvote,
  getUpvoteStatus,
};

