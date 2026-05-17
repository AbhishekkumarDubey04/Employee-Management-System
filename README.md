# AURA — Enterprise Intelligence & Employee Management Platform 💼🌐

Welcome to **AURA**, a premium, state-of-the-art corporate platform designed for modern workforce tracking, project execution, payroll processing, and real-time collaboration.

This repository is structured as a **Monorepo**, housing both the high-fidelity frontend client application and the secure relational backend database server.

---

## 📂 Monorepo Repository Structure

The project is organized into two primary, modular directories:

```text
├── EMS/                   # FRONTEND: React + Vite Single Page Application
└── EMS-backend/           # BACKEND: Node.js + Express REST API Server
```

---

## 🌟 Core System Modules

### 🎨 Client Side (`/EMS`)
* **Futuristic Dashboard**: A cinematic glassmorphic interface showing productivity scores, active teams, pending leaves, and real-time system metrics.
* **DnD Project Kanban**: Interactive task tracking powered by `@dnd-kit/core` with drag-and-drop support, progress tracking, and comments.
* **Corporate Messenger**: Direct messages with search features, contacts roster, and dedicated employee conversation threads.
* **Advanced Analytics**: Visual graphs and productivity trends for HR administrators using `recharts`.
* **Leave & Attendance Panel**: Smooth calendar integrations, monthly presence logging, and interactive leave application modals.

### 🔌 Server Side (`/EMS-backend`)
* **Secure Session Core**: Stateless authorization using JSON Web Tokens (JWT) and high-security Bcrypt password hashing.
* **Relational Database Schema**: Structured tables in MySQL covering users, employee logs, leaves, attendance records, tasks, and salaries.
* **Role-Based Security**: Complete route middleware to enforce authentication and isolate user vs. administrator privileges.
* **IST Timezone Mapping**: Native Indian Standard Time (IST) offset configuration for attendance logging.

---

## 🚀 Unified Monorepo Quickstart

Follow these steps to launch the entire AURA platform locally.

### 📋 Prerequisites
* **Node.js** (v18.0.0 or higher)
* **MySQL Server** (v8.0.0 or higher)

---

### Step 1: Start MySQL and Import the Database
Ensure your MySQL service is running (e.g. `MySQL80` or `MySQL91` service on port `3308`), then run these commands to initialize and seed the tables:

```bash
# 1. Create the schema (if not exists)
mysql -u root -p -P 3308 -e "CREATE DATABASE IF NOT EXISTS aura_ems;"

# 2. Seed tables and pre-hashed default users
mysql -u root -p -P 3308 aura_ems < "EMS-backend/database/schema.sql"
```

---

### Step 2: Start the Express Backend Server
1. Navigate to the backend directory and configure the environment variables in a `.env` file:
   ```env
   DB_HOST=localhost
   DB_PORT=3308
   DB_USER=root
   DB_PASSWORD=YourPassword
   DB_NAME=aura_ems
   JWT_SECRET=aura_ems_super_secret_key_change_this_in_production
   PORT=5000
   ```
2. Launch the developer server:
   ```bash
   cd EMS-backend
   npm install
   npm run dev
   ```
   *The server will start on **`http://localhost:5000`**.*

---

### Step 3: Start the React Frontend App
1. Open a new terminal window, navigate to the frontend directory:
   ```bash
   cd EMS
   npm install
   npm run dev
   ```
2. Open your browser and navigate to:
   👉 **`http://localhost:5173/auth`**

---

## 🔑 Default Demo Roster

You can log in instantly with any of the seeded credentials. Click **"Demo Admin"** or **"Demo User"** on the login page to auto-fill them, or log in manually:

| Name | Role | Email | Password |
| :--- | :---: | :--- | :--- |
| **Abhishek Kumar** | `ADMIN` | `abhishek@aura.ai` | `Dubeyji@04` |
| **Gurkirat Kaur** | `USER` | `gurkirat@aura.ai` | `Kitkat@21` |
| **Amit Sharma** | `USER` | `amit@aura.ai` | `Sharmaji@2010` |

---

## 🔒 Security Best Practices

1. **Production Environment**: Remember to change the `JWT_SECRET` key inside `EMS-backend/.env` before launching to production.
2. **Secure Passwords**: Avoid plain-text password insertions in seed files. Always use the pre-computed Bcrypt hashes.
3. **Excluded Files**: Sensitive configuration files (like `.env` and `node_modules` folders) are managed and excluded from git commits by the root [.gitignore](.gitignore) glob rules.
