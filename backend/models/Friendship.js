const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

const Friendship = sequelize.define('Friendship', {
  userId: { type: DataTypes.STRING, allowNull: false },
  friendId: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Friendship;