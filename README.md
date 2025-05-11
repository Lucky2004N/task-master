# 🚀 TaskMaster

<div align="center">
  <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/version-1.0.0-brightgreen.svg" alt="Version">
</div>

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=TaskMaster+Dashboard" alt="TaskMaster Dashboard" width="800">
</p>

## ✨ Overview

TaskMaster is a powerful task management platform designed to boost productivity and help you stay organized. With features like GitHub-style activity tracking, focus timers with rewards, and motivational notifications, TaskMaster transforms the way you manage your tasks and projects.

## 🎯 Key Features

- **📋 Task & Project Management**
  - Create, organize, and track tasks
  - Group tasks into projects
  - Set priorities and deadlines
  - Track progress with status updates

- **📊 GitHub-Style Activity Calendar**
  - Visualize your productivity with a contribution-style calendar
  - Build and maintain activity streaks
  - Track daily engagement and consistency

- **⏱️ Focus Timer with Rewards**
  - Set focused work sessions
  - Earn e-coins for completed sessions
  - Block distracting notifications during focus time
  - Build a virtual wallet of achievements

- **🔔 Smart Notifications**
  - Receive reminders for pending tasks
  - Get motivated with dynamic inspirational quotes
  - Stay on top of approaching deadlines
  - Celebrate completed tasks and milestones

## 🛠️ Tech Stack

### Backend
- Node.js & Express
- PostgreSQL database
- Sequelize ORM
- JWT Authentication
- RESTful API architecture

### Frontend
- React.js
- Redux for state management
- Tailwind CSS for styling
- Responsive design for all devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-master.git
   cd task-master
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory with:
   ```
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=30d
   DATABASE_URL=postgres://username:password@localhost:5432/taskmaster
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Set up the database**
   ```bash
   npm run setup-db
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

6. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

7. **Start the frontend application**
   ```bash
   npm run dev
   ```

8. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## 📱 App Screenshots

<div align="center">
  <img src="https://via.placeholder.com/400x250?text=Dashboard" alt="Dashboard" width="400">
  <img src="https://via.placeholder.com/400x250?text=Task+Management" alt="Task Management" width="400">
  <img src="https://via.placeholder.com/400x250?text=Activity+Calendar" alt="Activity Calendar" width="400">
  <img src="https://via.placeholder.com/400x250?text=Focus+Timer" alt="Focus Timer" width="400">
</div>

## 📊 API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Notifications
- `GET /api/notifications` - Get all notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read

### Activity & Focus
- `GET /api/activities/calendar` - Get activity calendar data
- `POST /api/focus/start` - Start a focus session
- `PUT /api/focus/:id/complete` - Complete a focus session
- `GET /api/focus/wallet` - Get user's e-coin wallet

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- CORS protection

## 🚧 Roadmap

- [ ] Mobile app (React Native)
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard
- [ ] Integrations with calendar apps
- [ ] Custom themes and personalization

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/task-master](https://github.com/yourusername/task-master)

---

<div align="center">
  <sub>Built with ❤️ by Your Name</sub>
</div>