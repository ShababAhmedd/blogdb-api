# Blog Database API

A RESTful API for managing blog posts and user authentication, built with Node.js, Express, and TypeScript. This API provides user registration/login, blog post management, and secure authentication using JWT tokens.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)

## Project Overview

BlogDB API is a full-featured backend API that allows users to:

- Register and authenticate with secure password hashing
- Create, read, update, and delete blog posts
- Manage user profiles
- Authenticate requests using JWT tokens

This is a production-ready API built with industry best practices including middleware for authentication, error handling, and secure password management.

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
├── app.ts                 # Express app configuration
├── server.ts              # Server entry point
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── config/
│   └── db.ts             # Database connection setup
├── controllers/
│   ├── auth.controller.ts # Authentication logic
│   ├── blog.controller.ts # Blog post operations
│   └── users.controller.ts # User management
├── models/
│   ├── user.model.ts      # User database model
│   └── blog.model.ts      # Blog post database model
├── routes/
│   ├── auth.route.ts      # Authentication endpoints
│   ├── blog.route.ts      # Blog post endpoints
│   └── user.route.ts      # User endpoints
├── middlewares/
│   ├── auth.middleware.ts # JWT verification middleware
│   └── blog.middleware.ts # Blog validation middleware
└── utils/
    ├── authenticatedRequest.ts # Request type definition
    └── getErrorMessage.ts      # Error handling utility
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
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

This will install all the required packages including Express, Sequelize, JWT, bcrypt, and development tools.

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project:

```bash
cp .env.example .env
```

The `.env.example` file is included in the repository. Update it with your actual configuration values:

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

Create a MySQL database named `blogdb`:

```bash
mysql -u root -p
```

Then in MySQL shell:

```sql
CREATE DATABASE blogdb;
EXIT;
```

## Running the Project

### Development Mode

Start the development server with auto-restart enabled:

```bash
npm run dev
```

The server will run on `http://localhost:5000` and automatically restart when you make changes to the code.

### Production Mode

Build and start the production server:

```bash
npm start
```

## Development

### Build TypeScript

```bash
npx tsc
```

### Run Tests

```bash
npm test
```

## License

ISC

---

For questions or support, please create an issue in the repository.
