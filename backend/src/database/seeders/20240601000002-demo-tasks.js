'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get the demo user to associate tasks with
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email = 'demo@taskmaster.com'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    if (users.length === 0) {
      console.log('Demo user not found, skipping task seeding');
      return;
    }
    
    const demoUserId = users[0].id;
    
    // Get the projects to associate tasks with
    const projects = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Projects" WHERE "userId" = :userId`,
      { 
        replacements: { userId: demoUserId },
        type: queryInterface.sequelize.QueryTypes.SELECT 
      }
    );
    
    if (projects.length === 0) {
      console.log('No projects found, skipping task seeding');
      return;
    }
    
    const websiteProjectId = projects.find(p => p.name === 'Website Redesign')?.id;
    const mobileProjectId = projects.find(p => p.name === 'Mobile App Development')?.id;
    
    const tasks = [];
    
    // Website Redesign tasks
    if (websiteProjectId) {
      tasks.push(
        {
          id: uuidv4(),
          title: 'Create wireframes',
          description: 'Create wireframes for all main pages',
          status: 'completed',
          priority: 'high',
          dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
          userId: demoUserId,
          projectId: websiteProjectId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          title: 'Design homepage',
          description: 'Design the homepage based on approved wireframes',
          status: 'in-progress',
          priority: 'high',
          dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
          userId: demoUserId,
          projectId: websiteProjectId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          title: 'Implement responsive design',
          description: 'Make sure the website works on all devices',
          status: 'todo',
          priority: 'medium',
          dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
          userId: demoUserId,
          projectId: websiteProjectId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );
    }
    
    // Mobile App Development tasks
    if (mobileProjectId) {
      tasks.push(
        {
          id: uuidv4(),
          title: 'Define app requirements',
          description: 'Document all app requirements and features',
          status: 'completed',
          priority: 'urgent',
          dueDate: new Date(new Date().setDate(new Date().getDate() - 5)),
          userId: demoUserId,
          projectId: mobileProjectId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          title: 'Create app mockups',
          description: 'Design mockups for all main screens',
          status: 'in-progress',
          priority: 'high',
          dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
          userId: demoUserId,
          projectId: mobileProjectId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          title: 'Setup development environment',
          description: 'Configure development environment for both iOS and Android',
          status: 'todo',
          priority: 'medium',
          dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          userId: demoUserId,
          projectId: mobileProjectId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );
    }
    
    // Add some tasks without a project
    tasks.push(
      {
        id: uuidv4(),
        title: 'Weekly team meeting',
        description: 'Prepare agenda for weekly team meeting',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        userId: demoUserId,
        projectId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Update portfolio',
        description: 'Add recent projects to personal portfolio',
        status: 'todo',
        priority: 'low',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        userId: demoUserId,
        projectId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );
    
    return queryInterface.bulkInsert('Tasks', tasks);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};