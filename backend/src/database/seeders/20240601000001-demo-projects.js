'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get the demo user to associate projects with
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email = 'demo@taskmaster.com'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    if (users.length === 0) {
      console.log('Demo user not found, skipping project seeding');
      return;
    }
    
    const demoUserId = users[0].id;
    
    return queryInterface.bulkInsert('Projects', [
      {
        id: uuidv4(),
        name: 'Website Redesign',
        description: 'Redesign the company website with modern UI/UX principles',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        userId: demoUserId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Mobile App Development',
        description: 'Develop a mobile app for both iOS and Android platforms',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        userId: demoUserId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};