const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Comment Model
const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 1000],
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  problemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'problems',
      key: 'id',
    },
  },
}, {
  tableName: 'comments',
  timestamps: true,
});

module.exports = Comment;

