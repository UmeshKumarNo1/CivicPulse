const { sequelize } = require('../config/database');
const User = require('./User');
const Problem = require('./Problem');
const Comment = require('./Comment');
const Upvote = require('./Upvote');

// Define Relationships

// User has many Problems
User.hasMany(Problem, {
  foreignKey: 'userId',
  as: 'problems',
  onDelete: 'CASCADE',
});

Problem.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// User has many Comments
User.hasMany(Comment, {
  foreignKey: 'userId',
  as: 'comments',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Problem has many Comments
Problem.hasMany(Comment, {
  foreignKey: 'problemId',
  as: 'comments',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Problem, {
  foreignKey: 'problemId',
  as: 'problem',
});

// User has many Upvotes
User.hasMany(Upvote, {
  foreignKey: 'userId',
  as: 'upvotes',
  onDelete: 'CASCADE',
});

Upvote.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Problem has many Upvotes
Problem.hasMany(Upvote, {
  foreignKey: 'problemId',
  as: 'upvotes',
  onDelete: 'CASCADE',
});

Upvote.belongsTo(Problem, {
  foreignKey: 'problemId',
  as: 'problem',
});

// Sync database
const syncDatabase = async () => {
  try {
    // Only create tables if they don't exist (doesn't alter or drop existing tables)
    await sequelize.sync();
    console.log('✅ Database synced successfully.');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Problem,
  Comment,
  Upvote,
  syncDatabase,
};

