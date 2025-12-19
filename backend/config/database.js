const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_NAME || 'civicpulse.db',
  logging: false, // Set to console.log to see SQL queries
  define: {
    timestamps: true, // Automatically add createdAt and updatedAt
    underscored: false,
  },
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, testConnection };

