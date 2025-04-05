const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Book;