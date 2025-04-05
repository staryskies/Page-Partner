const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Comment = sequelize.define('Comment', {
  bookId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});

module.exports = Comment;