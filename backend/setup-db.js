const { execSync } = require('child_process');
const path = require('path');

console.log('Setting up TaskMaster database...');

try {
  // Run migrations
  console.log('Running database migrations...');
  execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
  
  // Run seeders
  console.log('Seeding database with initial data...');
  execSync('npx sequelize-cli db:seed:all', { stdio: 'inherit' });
  
  console.log('Database setup completed successfully!');
  console.log('You can now start the application with: npm run dev');
} catch (error) {
  console.error('Error setting up database:', error.message);
  process.exit(1);
}