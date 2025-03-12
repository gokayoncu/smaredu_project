# smart_Edu

## Overview
smart_Edu is a comprehensive web application designed for educational institutions to manage courses, users, and categories effectively. It provides features such as user registration, course management, and flash messaging for user feedback, ensuring a seamless experience for both students and administrators.

## Live Demo
You can access the live version of the application at https://smaredu-project.onrender.com/.
Admin mail: admin@company.com
Admin password: 123456

## Features
- **User Authentication**: Secure login and registration for users.
- **Course Management**: Create, update, and delete courses with ease.
- **Category Management**: Organize courses into categories for better navigation.
- **Dashboard**: A user-friendly dashboard for students and admins to manage their activities.
- **Responsive Design**: A modern UI that works well on various devices.
- **Flash Messages**: Instant feedback for user actions (success/error notifications).
- **Contact Form**: Users can reach out for support or inquiries.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the application.
- **MongoDB**: NoSQL database for storing user and course data.
- **EJS**: Templating engine for rendering HTML views.
- **Bootstrap**: CSS framework for responsive design.
- **Nodemailer**: For sending emails from the contact form.

## Installation
1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/smart_edu.git
  cd smart_edu
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3.Create a .env file in the root directory and add the following environment variables:
  ```
DB_URL=your_mongo_database_url
PORT=5000
  ```
4.Start the application:
  ```
  npm start
  ```
Alternatively, for development mode:
  ```
  npm run dev
  ```


