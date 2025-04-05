const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }, // Plain text for simplicity; hash in production
  name: { type: DataTypes.STRING, allowNull: false },
  booksRead: { type: DataTypes.INTEGER, defaultValue: 0 },
  badges: { type: DataTypes.STRING }, // Comma-separated string for simplicity
});

module.exports = User;