# Blog Database API

A RESTful API for a Blog Management Application with role-based access control (Admin, User, Guest). Built with Node.js, Express, and TypeScript, featuring user authentication, blog management, and authorization.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)

## Project Overview

BlogDB API is a comprehensive REST API for a blog management system with three access levels:

- **Admin**: Full control over users and blogs
- **User**: Can create, update, and delete their own blogs; manage their profile
- **Guest**: Can read/search public blogs

The API implements secure authentication using JWT tokens and bcrypt password hashing, with role-based middleware for authorization.

## Features

- **Authentication**: User registration (public) and login with JWT tokens
- **User Management**:
  - User profile management (update profile, change password)
  - Admin can view all users and control user activation status
  - Admin can deactivate users to prevent login
- **Blog Management**:
  - Create blogs (authenticated users only)
  - Update own blogs (authenticated users)
  - Delete own blogs (authenticated users)
  - Search and filter blogs (public access)
  - Admin can update/delete any user's blog
- **Role-Based Access Control**: Admin-only and user-authenticated endpoints

## Technologies Used

- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/)
- **ORM**: [Sequelize](https://sequelize.org/)
- **Authentication**: [JWT (jsonwebtoken)](https://jwt.io/)
- **Password Hashing**: [bcrypt](https://www.npmjs.com/package/bcrypt)
- **Environment Management**: [dotenv](https://www.npmjs.com/package/dotenv)
- **Development Tools**:
  - [tsx](https://www.npmjs.com/package/tsx) (TypeScript executor)
  - [nodemon](https://nodemon.io/) (auto-restart on file changes)

```
blogdb-api/
├── app.ts                      # Express app configuration
├── server.ts                   # Server entry point
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── .env.example                # Environment variables template
├── config/
│   └── db.ts                   # MySQL/Sequelize configuration
├── controllers/
│   ├── auth.controller.ts      # Login & registration logic
│   ├── blog.controller.ts      # Blog CRUD operations
│   └── users.controller.ts     # User management operations
├── models/
│   ├── user.model.ts           # User database model
│   └── blog.model.ts           # Blog database model (with User relation)
├── routes/
│   ├── auth.route.ts           # Auth endpoints
│   ├── blog.route.ts           # Blog endpoints
│   └── user.route.ts           # User endpoints
├── middlewares/
│   ├── auth.middleware.ts      # JWT verification & role validation
│   └── blog.middleware.ts      # Blog ownership validation
└── utils/
    ├── authenticatedRequest.ts # Custom Request interface with user and blog data
    └── getErrorMessage.ts      # Error message extraction utility
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** package manager
- **MySQL** (v5.7 or higher)
- **Git** (for cloning the repository)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd blogdb-api
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages: Express, Sequelize, JWT, bcrypt, TypeScript, tsx, nodemon, and type definitions.

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your actual configuration values:

```env
# Server Configuration
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=blogdb
DB_PORT=3306

# Secret Key for JWT Authentication
SECRET_KEY=your_secret_key_here
```

### 4. Create Database

Create the MySQL database:

```bash
mysql -u root -p
```

Then in MySQL shell:

```sql
CREATE DATABASE blogdb;
EXIT;
```

The tables (`users` and `blogs`) will be automatically created when the server starts (via `sequelize.sync()`).

### 5. Create an Admin User

After starting the server for the first time, register a user via the API. Then manually update their role in MySQL:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

## Running the Project

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The server runs on `http://localhost:5000` and automatically restarts when you modify files.

### Production Mode

Start the production server:

```bash
npm start
```

## API Documentation

For complete API endpoint documentation, visit the Postman documentation:

**[Postman API Documentation](https://documenter.getpostman.com/view/40120598/2sBYAvtpby)**

This documentation includes all available endpoints, request/response examples, and authentication requirements.
