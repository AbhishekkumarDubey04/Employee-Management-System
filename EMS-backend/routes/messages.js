const express = require('express');
const db      = require('../config/db');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ─── GET /api/messages/contacts ───────────────────────────
// Returns all users except self (for the contact list)
router.get('/contacts', protect, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT u.id, u.name, u.title, e.status,
              (SELECT m.text FROM messages m
               WHERE (m.sender_id = u.id AND m.receiver_id = ?)
                  OR (m.sender_id = ? AND m.receiver_id = u.id)
               ORDER BY m.created_at DESC LIMIT 1) as last_message,
              (SELECT m.created_at FROM messages m
               WHERE (m.sender_id = u.id AND m.receiver_id = ?)
                  OR (m.sender_id = ? AND m.receiver_id = u.id)
               ORDER BY m.created_at DESC LIMIT 1) as last_time
       FROM users u
       LEFT JOIN employees e ON u.id = e.user_id
       WHERE u.id != ?
       ORDER BY last_time DESC, u.name ASC`,
      [req.user.id, req.user.id, req.user.id, req.user.id, req.user.id]
    );
    res.json({ contacts: rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── GET /api/messages/:userId ─────────────────────────────
// Get conversation with a specific user
router.get('/:userId', protect, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT m.*, 
              s.name as sender_name
       FROM messages m
       JOIN users s ON m.sender_id = s.id
       WHERE (m.sender_id = ? AND m.receiver_id = ?)
          OR (m.sender_id = ? AND m.receiver_id = ?)
       ORDER BY m.created_at ASC`,
      [req.user.id, req.params.userId, req.params.userId, req.user.id]
    );
    // Mark as read
    await db.query(
      "UPDATE messages SET is_read = TRUE WHERE sender_id = ? AND receiver_id = ?",
      [req.params.userId, req.user.id]
    );
    res.json({ messages: rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── POST /api/messages/:userId ────────────────────────────
router.post('/:userId', protect, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: 'Message text is required.' });

    const [result] = await db.query(
      'INSERT INTO messages (sender_id, receiver_id, text) VALUES (?,?,?)',
      [req.user.id, req.params.userId, text.trim()]
    );
    const [rows] = await db.query(
      'SELECT m.*, u.name as sender_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.id = ?',
      [result.insertId]
    );
    res.status(201).json({ message: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
