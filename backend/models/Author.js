const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

const Author = sequelize.define('Author', {
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Author;