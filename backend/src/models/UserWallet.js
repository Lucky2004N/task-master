const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserWallet = sequelize.define('UserWallet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  eCoins: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  lifetimeEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = UserWallet;