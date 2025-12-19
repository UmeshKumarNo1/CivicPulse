const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Upvote Model
const Upvote = sequelize.define('Upvote', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  tableName: 'upvotes',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'problemId'], // Ensure one user can upvote a problem only once
    },
  ],
});

module.exports = Upvote;

