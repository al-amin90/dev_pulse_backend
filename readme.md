# Dev Pulse Backend

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-ISC-blue)
![Node.js](https://img.shields.io/badge/Node.js-v16+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)

A production-ready RESTful API backend for Dev Pulse - a developer issue tracking and project management platform. Built with Express.js, TypeScript, and PostgreSQL.

**Live URL**: `https://dev-pulse-api.example.com` 


## ✨ Features

- **User Authentication & Authorization**
  - JWT-based secure authentication
  - Role-based access control (Contributor, Maintainer)
  - Password encryption with bcrypt
  - Secure signup and login endpoints

- **Issue Management System**
  - Create, read, update, and delete issues
  - Track issue status (Open, In Progress, Resolved)
  - Categorize issues (Bug, Feature Request)
  - Role-based issue management
  - Detailed issue descriptions and tracking

- **Security**
  - Bcrypt password hashing
  - JWT authentication with token-based authorization
  - CORS protection
  - Global error handling middleware
  - Environment variable management
  - Role-based access control (RBAC)

- **Developer Experience**
  - Full TypeScript support with strict typing
  - Hot-reload development server
  - Comprehensive error handling
  - RESTful API design
  - Modular architecture

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Runtime** | Node.js | v16+ |
| **Language** | TypeScript | 5.0+ |
| **Framework** | Express.js | 5.2.1 |
| **Database** | PostgreSQL | 12+ |
| **Authentication** | JWT | 9.0.3 |
| **Password Hash** | bcrypt | 6.0.0 |
| **CORS** | cors | 2.8.6 |
| **Dev Tools** | tsx | 4.22.3 |

---

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

\`\`\`bash
git clone https://github.com/al-amin90/dev_pulse_backend.git
cd dev_pulse_backend
\`\`\`

### Step 2: Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Step 3: Create PostgreSQL Database

\`\`\`sql
CREATE DATABASE dev_pulse;
\`\`\`

### Step 4: Create Environment File

\`\`\`bash
cp .env.example .env
\`\`\`

### Step 5: Configure Environment Variables

Edit \`.env\` file with your database and application credentials (see [Environment Configuration](#-environment-configuration) section)

### Step 6: Start the Application

\`\`\`bash
npm run dev
\`\`\`

Expected output:
\`\`\`
Example app listening on port 5000
Database Connected Successfully!
\`\`\`

---

## ⚙️ Environment Configuration

Create a \`.env\` file in the root directory with the following variables:

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
CONNECTION_STRING=postgresql://username:password@localhost:5432/dev_pulse

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_REFRESH_SECRET=your_refresh_token_secret_key_min_32_characters_long

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:3000
\`\`\`

### Environment Variables Reference

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| \`PORT\` | Server port number | \`5000\` | Yes |
| \`NODE_ENV\` | Environment mode | \`development\` / \`production\` | Yes |
| \`CONNECTION_STRING\` | PostgreSQL connection URI | \`postgresql://user:pass@localhost:5432/dev_pulse\` | Yes |
| \`JWT_SECRET\` | Secret key for JWT signing | \`your_secret_key_here\` | Yes |
| \`JWT_REFRESH_SECRET\` | Secret key for refresh tokens | \`your_refresh_secret_here\` | Yes |
| \`FRONTEND_URL\` | Frontend application URL | \`http://localhost:3000\` | Yes |

---

## 📡 API Endpoints

### Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

---

### Authentication Routes

**Base Path**: \`/api/auth\`

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---|---|
| \`POST\` | \`/api/auth/signup\` | Register new user | ❌ No | - |
| \`POST\` | \`/api/auth/login\` | User login | ❌ No | - |

---

#### 1. User Signup

\`\`\`http
POST /api/auth/signup
\`\`\`


---

#### 2. User Login

\`\`\`http
POST /api/auth/login
\`\`\`

---

### Issues Routes

**Base Path**: \`/api/issues\`

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---|---|
| \`POST\` | \`/api/issues\` | Create new issue | ✅ Yes | Contributor, Maintainer |
| \`GET\` | \`/api/issues\` | Get all issues | ❌ No | Public |
| \`GET\` | \`/api/issues/:id\` | Get issue by ID | ❌ No | Public |
| \`PATCH\` | \`/api/issues/:id\` | Update issue | ✅ Yes | Contributor, Maintainer |
| \`DELETE\` | \`/api/issues/:id\` | Delete issue | ✅ Yes | Maintainer |

---

#### 1. Create Issue

\`\`\`http
POST /api/issues
\`\`\`

---

#### 2. Get All Issues

\`\`\`http
GET /api/issues
\`\`\`

---

#### 3. Get Issue by ID

\`\`\`http
GET /api/issues/:id
\`\`\`

**Example:**
\`\`\`http
GET /api/issues/1
\`\`\`

---

#### 4. Update Issue

\`\`\`http
PATCH /api/issues/:id
\`\`\`

**Example:**
\`\`\`http
PATCH /api/issues/1
\`\`\`

---

#### 5. Delete Issue

\`\`\`http
DELETE /api/issues/:id
\`\`\`

---

## 💾 Database Schema

### Database Overview

The Dev Pulse Backend uses PostgreSQL with two main tables:
- **users** - Stores user account information
- **issues** - Stores issue/bug reports and feature requests

### Schema Summary

| Table | Purpose | Primary Key |
|-------|---------|---|
| \`users\` | User account information and authentication | \`id\` |
| \`issues\` | Issue tracking and reporting | \`id\` |

---

### Users Table

**Purpose**: Store user account information and authentication details


**User Roles:**
- \`contributor\` - Can create and update issues (default role)
- \`maintainer\` - Can create, update, and delete issues

---

### Issues Table

**Purpose**: Track bugs, feature requests, and project issues

**Issue Types:**
- \`bug\` - Bug report
- \`feature_request\` - Feature request or enhancement

**Issue Status:**
- \`open\` - New issue, not yet addressed
- \`in_progress\` - Currently being worked on
- \`resolved\` - Issue has been fixed/completed

---


## 🏃 Running the Application

### Development Mode (with Hot Reload)

\`\`\`bash
npm run dev
\`\`\`

The server will automatically reload when files change.

### Production Mode

\`\`\`bash
npm run build
npm start
\`\`\`

### Testing

\`\`\`bash
npm test
\`\`\`

---

## 🔐 Security Best Practices

- ✅ All passwords are hashed using bcrypt
- ✅ JWT tokens for secure authentication
- ✅ CORS protection with specified frontend URL
- ✅ Environment variables for sensitive data
- ✅ Global error handling prevents information leakage
- ✅ Input validation on all endpoints
- ✅ SQL injection protection via parameterized queries
- ✅ Role-based access control (RBAC)
- ✅ HTTP-only cookies for token storage

---

## 🔄 Typical API Workflow

### User Registration and Issue Creation Flow

\`\`\`
1. User Signup
   POST /api/auth/signup
   ↓ (Create new user account)
   
2. User Login
   POST /api/auth/login
   ↓ (Receive JWT token)
   
3. Create Issue
   POST /api/issues (with JWT token)
   ↓ (Create new issue)
   
4. Get All Issues
   GET /api/issues
   ↓ (View all issues)
   
5. Update Issue Status
   PATCH /api/issues/:id (with JWT token)
   ↓ (Update issue status to in_progress or resolved)
   
6. Delete Issue (Maintainer Only)
   DELETE /api/issues/:id (with JWT token)
\`\`\`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   \`\`\`bash
   git clone https://github.com/al-amin90/dev_pulse_backend.git
   \`\`\`

2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

3. **Make your changes and commit**
   \`\`\`bash
   git commit -m "feat: description of your changes"
   \`\`\`

4. **Push to your branch**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

5. **Create a Pull Request**
   - Describe your changes clearly
   - Link to any related issues

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Al Amin**
- GitHub: [@al-amin90](https://github.com/al-amin90)

---
