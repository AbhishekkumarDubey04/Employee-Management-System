const express = require('express');
const db      = require('../config/db');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// ─── GET /api/employees ────────────────────────────────────
router.get('/', protect, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT u.id, u.name, u.email, u.role, u.title, u.department, u.phone, u.location,
             e.status, e.productivity
      FROM users u
      LEFT JOIN employees e ON u.id = e.user_id
      ORDER BY u.name ASC
    `);
    res.json({ employees: rows });
  } catch (err) {
    console.error('[GET EMPLOYEES ERROR]', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── GET /api/employees/:id ────────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT u.id, u.name, u.email, u.role, u.title, u.department, u.phone, u.location, u.bio, u.join_date,
             e.status, e.productivity
      FROM users u
      LEFT JOIN employees e ON u.id = e.user_id
      WHERE u.id = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Employee not found.' });
    res.json({ employee: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── POST /api/employees (Admin only) ─────────────────────
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password = 'password123', role = 'USER', title, department, phone, location, status = 'Offline', productivity = 80 } = req.body;

    if (!name || !email) return res.status(400).json({ message: 'Name and email are required.' });

    const bcrypt = require('bcryptjs');
    const hashed = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, title, department, phone, location) VALUES (?,?,?,?,?,?,?,?)',
      [name, email, hashed, role, title, department, phone, location]
    );

    const userId = result.insertId;
    await db.query('INSERT INTO employees (user_id, status, productivity) VALUES (?,?,?)', [userId, status, productivity]);

    const [rows] = await db.query(
      'SELECT u.id, u.name, u.email, u.role, u.title, u.department, e.status, e.productivity FROM users u LEFT JOIN employees e ON u.id = e.user_id WHERE u.id = ?',
      [userId]
    );
    res.status(201).json({ employee: rows[0] });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Email already exists.' });
    console.error('[POST EMPLOYEE ERROR]', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── PUT /api/employees/:id (Admin only) ──────────────────
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { name, title, department, phone, location, status, productivity } = req.body;
    await db.query(
      'UPDATE users SET name=?, title=?, department=?, phone=?, location=? WHERE id=?',
      [name, title, department, phone, location, req.params.id]
    );
    if (status || productivity) {
      await db.query(
        'UPDATE employees SET status=COALESCE(?,status), productivity=COALESCE(?,productivity) WHERE user_id=?',
        [status, productivity, req.params.id]
      );
    }
    res.json({ message: 'Employee updated.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── DELETE /api/employees/:id (Admin only) ───────────────
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'Employee deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
