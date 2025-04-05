const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

const Chapter = sequelize.define('Chapter', {
  bookId: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT },
});

module.exports = Chapter;