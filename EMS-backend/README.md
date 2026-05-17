# AURA EMS Backend 🚀

The secure, high-performance, and production-ready server engine behind **AURA Employee Management System**. Built on **Node.js/Express** and **MySQL**, featuring **JWT session management** and **Bcrypt password security**.

---

## 🛠️ Technology Stack

* **Runtime Environment**: Node.js (v18+)
* **Server Framework**: Express.js
* **Database Relational Engine**: MySQL (v8.0+)
* **Database Driver**: `mysql2` (Promise-based connection pooling)
* **Encryption**: `bcryptjs`
* **Authentication**: `jsonwebtoken` (JWT)
* **Configuration**: `dotenv`
* **Development Reloading**: `nodemon`

---

## 🔒 Key Features

1. **Enterprise Authentication**: Secure registration and password hashing using Bcrypt, and stateless session tokens with JSON Web Tokens (JWT).
2. **Role-Based Access Control (RBAC)**: Distinct permissions for `ADMIN` (e.g., managing payroll, viewing advanced analytics, and modifying staff records) and `USER` (e.g., viewing own dashboard, applying for leaves, and clocking attendance).
3. **Database Connection Pooling**: Automatic configuration for IST timezone and connection limits to maximize database performance.
4. **Comprehensive Modules**: Support for:
   * 📅 **Attendance Tracking** (Clock In/Out, presence logs)
   * 🌴 **Leave Requests** (Application submission, status reviews)
   * 💼 **Employee Directory** (Productivity metrics, status logs)
   * 💸 **Payroll Processing** (Net pay calculation, disbursals)
   * 💬 **Corporate Messaging** (Real-time contact lookups and direct conversations)

---

## ⚙️ Configuration & Installation

### Prerequisities
Make sure you have **Node.js** and **MySQL Server** installed and running on your machine.

### Step 1: Install Dependencies
Navigate to the backend directory and install all required Node packages:
```bash
npm install
```

### Step 2: Configure Environment Variables
Create a file named `.env` in the root of the backend directory and configure your connection credentials:
```env
# MySQL Database Connection Details
DB_HOST=localhost
DB_PORT=3308           # Your active MySQL port
DB_USER=root
DB_PASSWORD=YourPassword
DB_NAME=aura_ems

# Authentication Token Security
JWT_SECRET=aura_ems_super_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Step 3: Initialize Database Schema
Load the database structure and default seed users:
```bash
mysql -u root -p -P 3308 -e "CREATE DATABASE IF NOT EXISTS aura_ems;"
mysql -u root -p -P 3308 aura_ems < database/schema.sql
```

---

## 🏃 Running the Server

Start the development server with automatic file reloading:
```bash
npm run dev
```
You will see the startup validation logs:
```text
🚀  AURA EMS Backend running on http://localhost:5000
📡  Client allowed from: http://localhost:5173
🔑  Auth endpoints: http://localhost:5000/api/auth

✅  MySQL connected successfully to database: aura_ems
```

---

## 📡 REST API Endpoints Summary

All routes are prefixed with `/api`.

### 🔑 Authentication (`/api/auth`)
* `POST /auth/register` - Create a new corporate employee account.
* `POST /auth/login` - Authenticate credentials and return JWT token.
* `GET /auth/me` - [Protected] Retrieve currently authenticated user profile.
* `PUT /auth/profile` - [Protected] Update current user profile (name, phone, location, bio, etc.).

### 📁 Employee Directory (`/api/employees`)
* `GET /employees` - [Protected] Retrieve all corporate employee profiles.
* `GET /employees/:id` - [Protected] Retrieve details of a single employee.
* `POST /employees` - [Admin Only] Create a new employee record.
* `PUT /employees/:id` - [Admin Only] Update an employee record.
* `DELETE /employees/:id` - [Admin Only] Terminate / delete an employee profile.

### 🌴 Leaves Tracker (`/api/leaves`)
* `GET /leaves` - [Protected] Retrieve all leave logs (users see their own, Admins see all).
* `POST /leaves` - [Protected] Submit a new casual or medical leave request.
* `PUT /leaves/:id/status` - [Admin Only] Approve or Reject a pending leave request.

### 📅 Attendance Tracker (`/api/attendance`)
* `GET /attendance` - [Protected] Retrieve attendance logs for a specific date.
* `GET /attendance/monthly` - [Protected] Retrieve monthly aggregates.
* `POST /attendance` - [Protected] Record a Clock-In or Clock-Out event.

### 💸 Payroll Management (`/api/payroll`)
* `GET /payroll` - [Admin Only] Retrieve all monthly payroll status records.
* `PUT /payroll/:id/disburse` - [Admin Only] Disburse salary to a specific employee.
* `PUT /payroll/disburse-all` - [Admin Only] Bulk disburse salary to all employees for a given month.

### 💬 Messaging System (`/api/messages`)
* `GET /messages/contacts` - [Protected] Retrieve list of corporate direct message contacts.
* `GET /messages/:userId` - [Protected] Fetch the conversation thread with a specific employee.
* `POST /messages/:userId` - [Protected] Send a direct message to a specific employee.

### 🩺 Health Checks (`/api/health`)
* `GET /health` - Public health-status checking route.
