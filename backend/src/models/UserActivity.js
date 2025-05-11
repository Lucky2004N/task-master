const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserActivity = sequelize.define('UserActivity', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  activityType: {
    type: DataTypes.ENUM('login', 'task_created', 'task_completed', 'focus_session'),
    allowNull: false
  },
  activityCount: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Duration in minutes (for focus sessions)'
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'date', 'activityType']
    }
  ]
});

module.exports = UserActivity;