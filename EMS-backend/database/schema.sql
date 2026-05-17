CREATE DATABASE IF NOT EXISTS aura_ems;
USE aura_ems;

CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(100) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
  title       VARCHAR(100) DEFAULT 'Employee',
  department  VARCHAR(100) DEFAULT 'General',
  phone       VARCHAR(25),
  location    VARCHAR(100),
  bio         TEXT,
  avatar_url  VARCHAR(255),
  join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Employee Status (linked to users) ────────────────────
CREATE TABLE IF NOT EXISTS employees (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT UNIQUE NOT NULL,
  status       ENUM('Online','Away','Offline','In a meeting') DEFAULT 'Offline',
  productivity INT DEFAULT 80 CHECK (productivity BETWEEN 0 AND 100),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── Teams ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teams (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  lead_id     INT,
  project     VARCHAR(200),
  color       VARCHAR(20) DEFAULT '#10B981',
  sprint      VARCHAR(50),
  progress    INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ─── Team Members (many-to-many) ──────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  team_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (team_id, user_id),
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── Leave Requests ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS leaves (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  type        ENUM('Sick Leave','Casual Leave','Earned Leave','Unpaid Leave') NOT NULL,
  from_date   DATE NOT NULL,
  to_date     DATE NOT NULL,
  days        INT NOT NULL,
  reason      TEXT,
  status      ENUM('Pending','Approved','Rejected') DEFAULT 'Pending',
  reviewed_by INT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ─── Attendance ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  date       DATE NOT NULL,
  clock_in   TIME,
  clock_out  TIME,
  status     ENUM('Present','Late','Absent') DEFAULT 'Present',
  UNIQUE KEY unique_attendance (user_id, date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── Projects / Tasks ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  tag         VARCHAR(50),
  column_id   ENUM('todo','inprogress','review','done') DEFAULT 'todo',
  due_date    DATE,
  comments    INT DEFAULT 0,
  attachments INT DEFAULT 0,
  created_by  INT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ─── Task Assignments (many-to-many) ──────────────────────
CREATE TABLE IF NOT EXISTS task_users (
  task_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (task_id, user_id),
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── Payroll ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payroll (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  month      DATE NOT NULL COMMENT 'First day of the payroll month',
  basic      DECIMAL(10,2) DEFAULT 0,
  hra        DECIMAL(10,2) DEFAULT 0,
  bonus      DECIMAL(10,2) DEFAULT 0,
  pf         DECIMAL(10,2) DEFAULT 0,
  tax        DECIMAL(10,2) DEFAULT 0,
  net_pay    DECIMAL(10,2) GENERATED ALWAYS AS (basic + hra + bonus - pf - tax) STORED,
  status     ENUM('Paid','Pending') DEFAULT 'Pending',
  paid_at    TIMESTAMP NULL,
  UNIQUE KEY unique_payroll (user_id, month),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── Messages ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  sender_id   INT NOT NULL,
  receiver_id INT NOT NULL,
  text        TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── Calendar Events ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS calendar_events (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  event_date  DATE NOT NULL,
  type        ENUM('leave','deadline','event') DEFAULT 'event',
  ref_id      INT COMMENT 'Optional reference to leave_id or task_id',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ════════════════════════════════════════════════════════════
--   SEED DATA — Initial admin + sample employees
-- ════════════════════════════════════════════════════════════

-- Password for all seeds: 'password123' (bcrypt hashed)
INSERT INTO users (name, email, password, role, title, department, phone, location, bio, join_date) VALUES
(
  'Abhishek Kumar',
  'abhishek@aura.ai',
  '$2a$10$m0vhlO5ModBIKpoGTz4Uwuwyg0woalaJtGSciH3QhuinWF1EL.yqu', -- Hashed 'Dubeyji@04'
  'ADMIN',
  'Java Full Stack Developer',
  'Engineering',
  '+91 98765 43210',
  'Bengaluru, India',
  'Java Full Stack Developer building scalable web applications.',
  '2023-10-01'
),
(
  'Gurkirat Kaur',
  'gurkirat@aura.ai',
  '$2a$10$.7fABeaI.XVFnGiZVGbH5eEUgHQ3Or7UF58Tt1s7ASRGeKQEwztZO', -- Hashed 'Kitkat@21'
  'USER',
  'Frontend Engineer',
  'Engineering',
  '+91 98765 12345',
  'Mumbai, India',
  'Passionate about building intuitive user interfaces.',
  '2024-01-15'
),
(
  'Amit Sharma',
  'amit@aura.ai',
  '$2a$10$T4IBYVnhNZIgb9uCwHyJ7OWqGIwNuSX60/.sfpDPm63y.r0fA2WWy', -- Hashed 'Sharmaji@2010'
  'USER',
  'UX Designer',
  'Design',
  '+91 98765 67890',
  'Delhi, India',
  'Data Engineer with a passion for building scalable data solutions.',
  '2023-11-01'
);

-- Employee statuses
INSERT INTO employees (user_id, status, productivity) VALUES
(1, 'Online', 92),
(2, 'Online', 95),
(3, 'In a meeting', 88);

-- Sample leave requests
INSERT INTO leaves (user_id, type, from_date, to_date, days, reason, status) VALUES
(2, 'Sick Leave', '2026-05-10', '2026-05-11', 2, 'Fever and rest', 'Approved'),
(3, 'Casual Leave', '2026-05-15', '2026-05-15', 1, 'Personal work', 'Pending');

-- Sample payroll (May 2026)
INSERT INTO payroll (user_id, month, basic, hra, bonus, pf, tax, status) VALUES
(1, '2026-05-01', 85000, 34000, 10000, 10200, 8500, 'Pending'),
(2, '2026-05-01', 78000, 31200, 8000, 9360, 7800, 'Pending'),
(3, '2026-05-01', 72000, 28800, 5000, 8640, 6200, 'Paid');

-- Sample tasks
INSERT INTO tasks (title, tag, column_id, created_by) VALUES
('Dashboard UI Components', 'Frontend', 'inprogress', 1),
('Implement JWT Auth', 'Backend', 'todo', 1),
('Employee Directory Module', 'Frontend', 'review', 2);
