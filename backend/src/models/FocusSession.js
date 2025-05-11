const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FocusSession = sequelize.define('FocusSession', {
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
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Duration in minutes'
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  eCoinsEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  taskId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Tasks',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

module.exports = FocusSession;