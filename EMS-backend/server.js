const express = require('express');
const cors    = require('cors');
require('dotenv').config();

// Import routes
const authRoutes       = require('./routes/auth');
const employeeRoutes   = require('./routes/employees');
const leavesRoutes     = require('./routes/leaves');
const attendanceRoutes = require('./routes/attendance');
const payrollRoutes    = require('./routes/payroll');
const messagesRoutes   = require('./routes/messages');

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────
app.use('/api/auth',       authRoutes);
app.use('/api/employees',  employeeRoutes);
app.use('/api/leaves',     leavesRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll',    payrollRoutes);
app.use('/api/messages',   messagesRoutes);

// ─── Health Check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    server: 'AURA EMS Backend',
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ──────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

// ─── Global Error Handler ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[UNHANDLED ERROR]', err.stack);
  res.status(500).json({ message: 'An unexpected server error occurred.' });
});

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  AURA EMS Backend running on http://localhost:${PORT}`);
  console.log(`📡  Client allowed from: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  console.log(`🔑  Auth endpoints: http://localhost:${PORT}/api/auth\n`);
});
// Nodemon trigger comment
