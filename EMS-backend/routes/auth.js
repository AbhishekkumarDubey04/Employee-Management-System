const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const db       = require('../config/db');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ─── Helper: generate JWT ──────────────────────────────────
const generateToken = (user) =>
  jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

// ─── POST /api/auth/register ───────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'USER', title, department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Check if email already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db.query(
      `INSERT INTO users (name, email, password, role, title, department)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, hashed, role, title || 'Employee', department || 'General']
    );

    const userId = result.insertId;

    // Create employee record
    await db.query('INSERT INTO employees (user_id) VALUES (?)', [userId]);

    // Fetch the new user (without password)
    const [rows] = await db.query(
      'SELECT id, name, email, role, title, department, phone, location, bio, join_date FROM users WHERE id = ?',
      [userId]
    );

    const user = rows[0];
    res.status(201).json({ user, token: generateToken(user) });

  } catch (err) {
    console.error('[REGISTER ERROR]', err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// ─── POST /api/auth/login ──────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = rows[0];

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Return user (without password) + token
    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser, token: generateToken(safeUser) });

  } catch (err) {
    console.error('[LOGIN ERROR]', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// ─── GET /api/auth/me  (validate token, get current user) ──
router.get('/me', protect, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, role, title, department, phone, location, bio, join_date, avatar_url FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'User not found.' });
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── PUT /api/auth/profile (update own profile) ───────────
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, location, bio, title } = req.body;
    await db.query(
      'UPDATE users SET name = ?, phone = ?, location = ?, bio = ?, title = ? WHERE id = ?',
      [name, phone, location, bio, title, req.user.id]
    );
    const [rows] = await db.query(
      'SELECT id, name, email, role, title, department, phone, location, bio FROM users WHERE id = ?',
      [req.user.id]
    );
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
