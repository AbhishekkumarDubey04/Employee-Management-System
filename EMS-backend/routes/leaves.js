const express = require('express');
const db      = require('../config/db');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// ─── GET /api/leaves ── Admin sees all, User sees own ──────
router.get('/', protect, async (req, res) => {
  try {
    let query = `
      SELECT l.*, u.name, u.department
      FROM leaves l
      JOIN users u ON l.user_id = u.id
    `;
    const params = [];
    if (req.user.role !== 'ADMIN') {
      query += ' WHERE l.user_id = ?';
      params.push(req.user.id);
    }
    query += ' ORDER BY l.created_at DESC';
    const [rows] = await db.query(query, params);
    res.json({ leaves: rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── POST /api/leaves ──────────────────────────────────────
router.post('/', protect, async (req, res) => {
  try {
    const { type, from_date, to_date, days, reason } = req.body;
    const [result] = await db.query(
      'INSERT INTO leaves (user_id, type, from_date, to_date, days, reason) VALUES (?,?,?,?,?,?)',
      [req.user.id, type, from_date, to_date, days, reason]
    );
    const [rows] = await db.query(
      'SELECT l.*, u.name, u.department FROM leaves l JOIN users u ON l.user_id = u.id WHERE l.id = ?',
      [result.insertId]
    );
    res.status(201).json({ leave: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── PUT /api/leaves/:id/status (Admin only) ──────────────
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Approved or Rejected.' });
    }
    await db.query(
      'UPDATE leaves SET status = ?, reviewed_by = ? WHERE id = ?',
      [status, req.user.id, req.params.id]
    );
    res.json({ message: `Leave ${status}.` });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
