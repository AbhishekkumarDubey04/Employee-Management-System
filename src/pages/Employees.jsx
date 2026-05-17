import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, MoreVertical, Mail, Phone, Plus, X, User } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { cn } from '../lib/utils';

const DEPARTMENTS = ['Engineering', 'Design', 'Product', 'Human Resources', 'Finance', 'Marketing'];
const STATUSES = ['Online', 'Away', 'Offline', 'In a meeting'];

const initEmployees = [
  { id: 1, name: 'Abhishek Kumar', role: 'Java Full Stack Developer', department: 'Engineering', status: 'Online', productivity: 92, avatar: 'A' },
  { id: 2, name: 'Gurkirat Kaur', role: 'UX Designer', department: 'Design', status: 'In a meeting', productivity: 88, avatar: 'S' },
  { id: 3, name: 'Amit Sharma', role: 'Data Engineer', department: 'Data Science', status: 'Offline', productivity: 75, avatar: 'J' },
  { id: 4, name: 'Harsh Aryan', role: 'Senior Data Scientist', department: 'Data Science', status: 'Online', productivity: 95, avatar: 'E' },
  { id: 5, name: 'Kushal Kanti', role: 'Backend Engineer', department: 'Engineering', status: 'Away', productivity: 82, avatar: 'M' },
  { id: 6, name: 'Pranay Parmar', role: 'HR Manager', department: 'Human Resources', status: 'Online', productivity: 90, avatar: 'J' },
  { id: 7, name: 'Mayank Pritsey', role: 'Legal Advisor', department: 'Legal', status: 'Online', productivity: 92, avatar: 'A' },
  { id: 8, name: 'Avnish Dwivedi ', role: 'Software Developer', department: 'Engineering', status: 'Online', productivity: 92, avatar: 'A' },

];

const statusDot = { Online: 'bg-green-500', Away: 'bg-yellow-500', Offline: 'bg-gray-500', 'In a meeting': 'bg-blue-500' };

function AddEmployeeModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', role: '', department: 'Engineering', status: 'Online', productivity: 80 });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, id: Date.now(), avatar: form.name.charAt(0).toUpperCase(), productivity: Number(form.productivity) });
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
          <h3 className="text-lg font-semibold text-text flex items-center gap-2"><User size={18} className="text-accent" /> Add Employee</h3>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-muted uppercase mb-2">Full Name *</label>
            <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Alex Johnson"
              className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted uppercase mb-2">Role / Title *</label>
            <input required value={form.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Senior Developer"
              className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-2">Department</label>
              <select value={form.department} onChange={e => set('department', e.target.value)}
                className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text focus:outline-none focus:border-accent/50 transition-all">
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-2">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text focus:outline-none focus:border-accent/50 transition-all">
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-muted uppercase mb-2">Productivity: {form.productivity}%</label>
            <input type="range" min="0" max="100" value={form.productivity} onChange={e => set('productivity', e.target.value)}
              className="w-full accent-accent" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-border rounded-xl text-sm text-muted hover:text-text hover:bg-glass transition-colors">Cancel</button>
            <GlowButton type="submit" className="flex-1 py-2.5">Add Employee</GlowButton>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function Employees() {
  const [employees, setEmployees] = useState(initEmployees);
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addEmployee = (emp) => setEmployees(prev => [emp, ...prev]);

  return (
    <div className="flex flex-col h-full gap-6">
      <AnimatePresence>
        {showModal && <AddEmployeeModal onClose={() => setShowModal(false)} onAdd={addEmployee} />}
      </AnimatePresence>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text tracking-tight">Employees</h1>
          <p className="text-sm text-muted mt-1">Manage your workforce directory.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={16} />
            <input type="text" placeholder="Search directory..." value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-glass border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-text placeholder-gray-500 focus:outline-none focus:border-accent/50 transition-all" />
          </div>
          <button className="p-2 bg-glass border border-border rounded-lg text-muted hover:text-text hover:bg-glass-hover transition-colors">
            <Filter size={20} />
          </button>
          <div className="flex bg-glass border border-border rounded-lg p-1">
            <button onClick={() => setView('grid')}
              className={cn('p-1.5 rounded-md transition-colors', view === 'grid' ? 'bg-glass-hover text-text' : 'text-muted')}>
              <Grid size={16} />
            </button>
            <button onClick={() => setView('list')}
              className={cn('p-1.5 rounded-md transition-colors', view === 'list' ? 'bg-glass-hover text-text' : 'text-muted')}>
              <List size={16} />
            </button>
          </div>
          <GlowButton onClick={() => setShowModal(true)} className="py-2 px-4 text-sm flex items-center gap-2">
            <Plus size={16} /> Add Employee
          </GlowButton>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map(emp => (
              <motion.div key={emp.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                <GlassCard className="flex flex-col p-6 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-border flex items-center justify-center text-2xl font-bold text-muted group-hover:border-accent/50 transition-colors">
                        {emp.avatar}
                      </div>
                      <span className={cn('absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card', statusDot[emp.status])} />
                    </div>
                    <button className="text-muted hover:text-text transition-colors"><MoreVertical size={20} /></button>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text">{emp.name}</h3>
                    <p className="text-accent text-sm font-mono mt-1 glow-text">{emp.role}</p>
                    <p className="text-xs text-muted mt-1">{emp.department}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex gap-2 text-muted">
                      <button className="p-2 bg-glass rounded-lg hover:text-text hover:bg-glass-hover transition-colors"><Mail size={16} /></button>
                      <button className="p-2 bg-glass rounded-lg hover:text-text hover:bg-glass-hover transition-colors"><Phone size={16} /></button>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted font-mono">PRODUCTIVITY</p>
                      <p className="text-lg font-bold text-text">{emp.productivity}%</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* List View */}
      {view === 'list' && (
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-xs text-muted font-mono uppercase bg-glass">
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Productivity</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(emp => (
                  <tr key={emp.id} className="border-b border-border hover:bg-glass transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-border flex items-center justify-center font-bold text-muted">
                          {emp.avatar}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text group-hover:text-accent transition-colors">{emp.name}</p>
                        <p className="text-xs text-muted font-mono mt-0.5">{emp.role}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">{emp.department}</td>
                    <td className="px-6 py-4">
                      <span className={cn('text-xs px-2 py-1 rounded-full border flex items-center gap-1.5 w-max',
                        emp.status === 'Online' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                          emp.status === 'Away' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                            emp.status === 'In a meeting' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                              'bg-gray-500/10 border-gray-500/20 text-muted')}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', statusDot[emp.status])} />
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-glass-hover rounded-full overflow-hidden w-24">
                          <div className="h-full bg-accent" style={{ width: `${emp.productivity}%` }} />
                        </div>
                        <span className="text-xs font-mono text-muted">{emp.productivity}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-muted hover:text-text transition-colors"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
