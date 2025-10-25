# College Base Management System

## Overview
The College Base Management System is a web application designed to manage student information and administrative tasks for colleges. It consists of a client-side React application and a server-side Node.js application connected to a MongoDB Atlas database.

## Project Structure
```
College-Base-Management-System
├── client
│   ├── package.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── index.js
│       ├── App.js
│       ├── components
│       │   ├── Header.js
│       │   ├── Footer.js
│       │   └── StudentList.js
│       ├── pages
│       │   ├── Home.js
│       │   ├── Students.js
│       │   └── Admin.js
│       ├── services
│       │   └── api.js
│       ├── hooks
│       │   └── useAuth.js
│       └── styles
│           └── main.css
├── server
│   ├── package.json
│   ├── .env.example
│   └── src
│       ├── index.js
│       ├── config
│       │   └── db.js
│       ├── controllers
│       │   └── studentController.js
│       ├── models
│       │   └── Student.js
│       ├── routes
│       │   └── studentRoutes.js
│       ├── middleware
│       │   └── auth.js
│       └── utils
│           └── logger.js
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd College-Base-Management-System
   ```

2. Set up the server:
   - Navigate to the server directory:
     ```
     cd server
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file based on the `.env.example` file and add your MongoDB connection string.

3. Set up the client:
   - Navigate to the client directory:
     ```
     cd ../client
     ```
   - Install dependencies:
     ```
     npm install
     ```

### Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd ../client
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Features
- Student management (CRUD operations)
- Admin functionalities
- User authentication

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.