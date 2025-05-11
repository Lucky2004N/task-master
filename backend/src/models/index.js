const User = require('./User');
const Task = require('./Task');
const Project = require('./Project');
const Notification = require('./Notification');
const UserActivity = require('./UserActivity');
const UserWallet = require('./UserWallet');
const FocusSession = require('./FocusSession');

// Define relationships between models
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

// Notification relationships
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Task.hasMany(Notification, { foreignKey: 'taskId', as: 'notifications' });
Notification.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });

// User Activity relationships (for streak calendar)
User.hasMany(UserActivity, { foreignKey: 'userId', as: 'activities' });
UserActivity.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User Wallet relationships (for e-coins)
User.hasOne(UserWallet, { foreignKey: 'userId', as: 'wallet' });
UserWallet.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Focus Session relationships
User.hasMany(FocusSession, { foreignKey: 'userId', as: 'focusSessions' });
FocusSession.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Task.hasMany(FocusSession, { foreignKey: 'taskId', as: 'focusSessions' });
FocusSession.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });

module.exports = {
  User,
  Task,
  Project,
  Notification,
  UserActivity,
  UserWallet,
  FocusSession
};