const express = require('express');
const db      = require('../config/db');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// ─── GET /api/attendance?date=YYYY-MM-DD ──────────────────
router.get('/', protect, async (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().split('T')[0];
    let query = `
      SELECT a.*, u.name, u.department
      FROM attendance a
      JOIN users u ON a.user_id = u.id
      WHERE a.date = ?
    `;
    const params = [date];
    if (req.user.role !== 'ADMIN') {
      query += ' AND a.user_id = ?';
      params.push(req.user.id);
    }
    const [rows] = await db.query(query, params);
    res.json({ attendance: rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── GET /api/attendance/monthly?month=YYYY-MM ────────────
router.get('/monthly', protect, async (req, res) => {
  try {
    const month = req.query.month || new Date().toISOString().substring(0, 7);
    const [rows] = await db.query(
      `SELECT * FROM attendance WHERE user_id = ? AND DATE_FORMAT(date, '%Y-%m') = ?`,
      [req.user.id, month]
    );
    res.json({ attendance: rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── POST /api/attendance (clock in) ──────────────────────
router.post('/', protect, async (req, res) => {
  try {
    const { date, clock_in, clock_out, status } = req.body;
    await db.query(
      `INSERT INTO attendance (user_id, date, clock_in, clock_out, status)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE clock_in=VALUES(clock_in), clock_out=VALUES(clock_out), status=VALUES(status)`,
      [req.user.id, date, clock_in, clock_out, status || 'Present']
    );
    res.json({ message: 'Attendance recorded.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
