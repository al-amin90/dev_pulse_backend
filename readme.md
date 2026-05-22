# Dev Pulse Backend

A modern RESTful API backend for the Dev Pulse platform, built with **Express.js** and **TypeScript**. This project provides authentication and issue management services with PostgreSQL database integration.

**Live Site Link**: [Click here](https://dev-pulse-backend-hazel.vercel.app)

## 🎯 Overview

Dev Pulse Backend is a robust API server designed to power the Dev Pulse application. It handles user authentication, authorization, and issue/project management with a focus on security and scalability.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js 5.2
- **Database**: PostgreSQL (pg 8.21)
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Security**: bcrypt & bcryptjs for password hashing
- **Middleware**: CORS, Cookie Parser
- **Development**: tsx (TypeScript execution)

## ✨ Features

- ✅ **User Authentication**: Secure JWT-based authentication system
- ✅ **Password Security**: bcrypt encryption for secure password storage
- ✅ **CORS Support**: Cross-origin resource sharing configured
- ✅ **Cookie Management**: Session and token management via cookies
- ✅ **Issue Management**: Track and manage project issues
- ✅ **Error Handling**: Global error handling middleware
- ✅ **TypeScript**: Full type safety with TypeScript
- ✅ **Database Integration**: PostgreSQL with type-safe queries

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or higher)

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/al-amin90/dev_pulse_backend.git
cd dev_pulse_backend
```
