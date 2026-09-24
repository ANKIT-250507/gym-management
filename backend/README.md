# Gym Management System

A full-stack Gym Management System Backend built using Node.js, Express.js, MongoDB, and JWT Authentication.

## Features

- User Authentication (Register/Login)
- JWT Authentication
- Role-Based Authorization (Admin, Trainer, Member)
- Member Profile Management
- Workout Management
- Diet Plan Management
- Attendance Management
- Membership Management
- Health Module (BMI, Calories, Protein)
- Product Management
- Notifications
- Dashboard Analytics
- Reports

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt
- Nodemon

## Installation

```bash
git clone <repository-url>
cd gym-management
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## API Base URL

```
http://localhost:3000/api
```

## Folder Structure

```
config/
controllers/
middleware/
models/
routes/
utils/
uploads/
server.js
```

## Author

Ankit Pandey