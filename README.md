# Task Master

A modern task management platform for individuals and small teams.

## Features

- User authentication with JWT
- Create, edit, delete, and mark tasks as completed
- Organize tasks into categories or projects
- Set deadlines and priorities for each task
- View tasks in different formats (list view, calendar view)
- Filter tasks by status (pending, completed, overdue)
- Responsive UI that works on desktop and mobile

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Toastify
- Date-fns

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Bcrypt

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/task-master.git
cd task-master
```

2. Set up the backend
```
cd backend
npm install
```

3. Create a PostgreSQL database named `taskmaster`

4. Configure environment variables
   - Copy `.env.example` to `.env`
   - Update the database credentials and JWT secret

5. Start the backend server
```
npm run dev
```

6. Set up the frontend
```
cd ../frontend
npm install
```

7. Configure frontend environment variables
   - Copy `.env.example` to `.env`
   - Update the API URL if needed

8. Start the frontend development server
```
npm run dev
```

9. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
task-master/
├── backend/                # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Entry point
│   ├── .env                # Environment variables
│   └── package.json        # Dependencies
│
└── frontend/               # React.js frontend
    ├── public/             # Static files
    ├── src/
    │   ├── assets/         # Images, fonts, etc.
    │   ├── components/     # Reusable components
    │   ├── context/        # React context
    │   ├── pages/          # Page components
    │   ├── utils/          # Utility functions
    │   ├── App.jsx         # Main component
    │   └── main.jsx        # Entry point
    ├── .env                # Environment variables
    └── package.json        # Dependencies
```

## Deployment

- Frontend: Vercel
- Backend: Render or Heroku
- Database: Render or Heroku PostgreSQL

## Future Enhancements

- Team collaboration features
- Real-time updates
- Email notifications
- File attachments
- Mobile app

## License

This project is licensed under the MIT License - see the LICENSE file for details.