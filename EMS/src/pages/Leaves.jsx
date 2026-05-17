import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, CheckCircle, XCircle, X } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MetricWidget from '../components/MetricWidget';
import GlowButton from '../components/GlowButton';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

const LEAVE_TYPES = ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Unpaid Leave'];

const initialLeaves = [
  { id: 1, name: 'Sarah Miller', type: 'Sick Leave', from: '2026-05-10', to: '2026-05-11', days: 2, reason: 'Fever and rest', status: 'Approved', dept: 'Design' },
  { id: 2, name: 'James Wilson', type: 'Casual Leave', from: '2026-05-15', to: '2026-05-15', days: 1, reason: 'Personal work', status: 'Pending', dept: 'Product' },
  { id: 3, name: 'Michael Brown', type: 'Earned Leave', from: '2026-05-20', to: '2026-05-23', days: 4, reason: 'Family vacation', status: 'Pending', dept: 'Engineering' },
  { id: 4, name: 'Emily Davis', type: 'Casual Leave', from: '2026-04-28', to: '2026-04-28', days: 1, reason: 'Doctor appointment', status: 'Approved', dept: 'Engineering' },
  { id: 5, name: 'Jessica Taylor', type: 'Unpaid Leave', from: '2026-05-25', to: '2026-05-26', days: 2, reason: 'Extended personal leave', status: 'Rejected', dept: 'HR' },
];

const statusStyle = {
  Approved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const itemAnim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function RequestModal({ onClose, onSubmit, userName }) {
  const [form, setForm] = useState({ type: 'Sick Leave', from: '', to: '', reason: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = new Date(form.from);
    const to = new Date(form.to);
    const days = Math.max(Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1, 1);
    onSubmit({ ...form, name: userName, days, status: 'Pending', dept: 'Engineering' });
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text">Apply for Leave</h3>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-muted uppercase mb-2">Leave Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
              className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text focus:outline-none focus:border-accent/50 transition-all">
              {LEAVE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-2">From</label>
              <input type="date" required value={form.from} onChange={e => setForm({ ...form, from: e.target.value })}
                className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text focus:outline-none focus:border-accent/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-2">To</label>
              <input type="date" required value={form.to} onChange={e => setForm({ ...form, to: e.target.value })}
                className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text focus:outline-none focus:border-accent/50 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-muted uppercase mb-2">Reason</label>
            <textarea required value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}
              rows={3} placeholder="Briefly describe the reason..."
              className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-all resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-border rounded-xl text-sm text-muted hover:text-text hover:bg-glass transition-colors">Cancel</button>
            <GlowButton type="submit" className="flex-1 py-2.5">Submit Request</GlowButton>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function Leaves() {
  const { user, isAdmin } = useAuth();
  const [leaves, setLeaves] = useState(initialLeaves);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');

  const userLeaves = isAdmin ? leaves : leaves.filter(l => l.name === user?.name);
  const filtered = filter === 'All' ? userLeaves : userLeaves.filter(l => l.status === filter);

  const addLeave = (leave) => setLeaves(prev => [{ ...leave, id: Date.now() }, ...prev]);
  const updateStatus = (id, status) => setLeaves(prev => prev.map(l => l.id === id ? { ...l, status } : l));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <AnimatePresence>
        {showModal && <RequestModal onClose={() => setShowModal(false)} onSubmit={addLeave} userName={user?.name} />}
      </AnimatePresence>

      <motion.div variants={itemAnim} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text tracking-tight">Leave Management</h1>
          <p className="text-sm text-muted mt-1">{isAdmin ? 'Review and manage all leave requests.' : 'Apply for and track your leave requests.'}</p>
        </div>
        <GlowButton onClick={() => setShowModal(true)} className="flex items-center gap-2 py-2 px-4 text-sm">
          <Plus size={16} /> Apply for Leave
        </GlowButton>
      </motion.div>

      <motion.div variants={itemAnim} className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricWidget title="Pending" value={leaves.filter(l => l.status === 'Pending').length.toString()} icon={Clock} trend={0} />
        <MetricWidget title="Approved" value={leaves.filter(l => l.status === 'Approved').length.toString()} icon={CheckCircle} trend={2} />
        <MetricWidget title="Rejected" value={leaves.filter(l => l.status === 'Rejected').length.toString()} icon={XCircle} trend={0} />
      </motion.div>

      <motion.div variants={itemAnim} className="flex gap-2 flex-wrap">
        {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
              filter === f ? 'bg-accent/10 text-accent border-accent/20' : 'text-muted border-border hover:text-text hover:bg-glass')}>
            {f}
          </button>
        ))}
      </motion.div>

      <motion.div variants={itemAnim}>
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-mono text-muted uppercase border-b border-border bg-glass">
                  <th className="px-6 py-3">Employee</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Duration</th>
                  <th className="px-6 py-3">Days</th>
                  <th className="px-6 py-3">Reason</th>
                  <th className="px-6 py-3">Status</th>
                  {isAdmin && <th className="px-6 py-3">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={isAdmin ? 7 : 6} className="px-6 py-12 text-center text-muted text-sm">No leave requests found.</td></tr>
                ) : filtered.map(l => (
                  <tr key={l.id} className="border-b border-border hover:bg-glass transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-text">{l.name}</p>
                      <p className="text-xs text-muted">{l.dept}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-full">{l.type}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-muted">{l.from} → {l.to}</td>
                    <td className="px-6 py-4 text-sm font-bold text-text">{l.days}d</td>
                    <td className="px-6 py-4 text-sm text-muted max-w-[200px] truncate">{l.reason}</td>
                    <td className="px-6 py-4">
                      <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', statusStyle[l.status])}>{l.status}</span>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4">
                        {l.status === 'Pending' && (
                          <div className="flex gap-2">
                            <button onClick={() => updateStatus(l.id, 'Approved')}
                              className="text-xs px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors">Approve</button>
                            <button onClick={() => updateStatus(l.id, 'Rejected')}
                              className="text-xs px-3 py-1 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-colors">Reject</button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
