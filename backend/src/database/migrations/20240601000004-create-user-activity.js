'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserActivities', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      activityType: {
        type: Sequelize.ENUM('login', 'task_created', 'task_completed', 'focus_session'),
        allowNull: false
      },
      activityCount: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Duration in minutes (for focus sessions)'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Add a unique constraint for userId, date, and activityType
    await queryInterface.addIndex('UserActivities', ['userId', 'date', 'activityType'], {
      unique: true,
      name: 'user_activity_unique_idx'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserActivities');
  }
};