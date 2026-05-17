const express = require('express');
const db      = require('../config/db');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// ─── GET /api/payroll?month=YYYY-MM-DD (Admin only) ───────
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const month = req.query.month || new Date().toISOString().split('T')[0].substring(0, 7) + '-01';
    const [rows] = await db.query(
      `SELECT p.*, u.name, u.department, u.title
       FROM payroll p
       JOIN users u ON p.user_id = u.id
       WHERE DATE_FORMAT(p.month, '%Y-%m') = DATE_FORMAT(?, '%Y-%m')
       ORDER BY u.name ASC`,
      [month]
    );
    res.json({ payroll: rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── PUT /api/payroll/:id/disburse (Admin only) ───────────
router.put('/:id/disburse', protect, adminOnly, async (req, res) => {
  try {
    await db.query(
      "UPDATE payroll SET status = 'Paid', paid_at = NOW() WHERE id = ?",
      [req.params.id]
    );
    res.json({ message: 'Salary disbursed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── PUT /api/payroll/disburse-all (Admin only) ───────────
router.put('/disburse-all', protect, adminOnly, async (req, res) => {
  try {
    const { month } = req.body;
    await db.query(
      "UPDATE payroll SET status = 'Paid', paid_at = NOW() WHERE DATE_FORMAT(month, '%Y-%m') = ? AND status = 'Pending'",
      [month]
    );
    res.json({ message: 'All pending salaries disbursed.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
