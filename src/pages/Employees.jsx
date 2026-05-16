import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, MoreVertical, Mail, Phone } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { cn } from '../lib/utils';

const mockEmployees = [
  { id: 1, name: 'Abhishek Kumar', role: 'Java Full Stack Developer', department: 'Engineering', status: 'Online', productivity: 92, avatar: 'A' },
  { id: 2, name: 'Sarah Miller', role: 'UX Designer', department: 'Design', status: 'In a meeting', productivity: 88, avatar: 'S' },
  { id: 3, name: 'James Wilson', role: 'Product Manager', department: 'Product', status: 'Offline', productivity: 75, avatar: 'J' },
  { id: 4, name: 'Emily Davis', role: 'Frontend Engineer', department: 'Engineering', status: 'Online', productivity: 95, avatar: 'E' },
  { id: 5, name: 'Michael Brown', role: 'Backend Engineer', department: 'Engineering', status: 'Away', productivity: 82, avatar: 'M' },
  { id: 6, name: 'Jessica Taylor', role: 'HR Manager', department: 'Human Resources', status: 'Online', productivity: 90, avatar: 'J' },
];

export default function Employees() {
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = mockEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text tracking-tight">Employees</h1>
          <p className="text-sm text-muted mt-1">Manage your workforce directory.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search directory..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-glass border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-text placeholder-gray-500 focus:outline-none focus:border-accent/50 transition-all"
            />
          </div>
          <button className="p-2 bg-glass border border-border rounded-lg text-muted hover:text-text hover:bg-glass-hover transition-colors">
            <Filter size={20} />
          </button>
          <div className="flex bg-glass border border-border rounded-lg p-1">
            <button 
              onClick={() => setView('grid')}
              className={cn("p-1.5 rounded-md transition-colors", view === 'grid' ? "bg-glass-hover text-text" : "text-muted hover:text-muted")}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-1.5 rounded-md transition-colors", view === 'list' ? "bg-glass-hover text-text" : "text-muted hover:text-muted")}
            >
              <List size={16} />
            </button>
          </div>
          <GlowButton className="py-2 px-4 text-sm hidden md:flex">Add Employee</GlowButton>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredEmployees.map((emp) => (
              <motion.div
                key={emp.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard className="flex flex-col p-6 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-border flex items-center justify-center text-2xl font-bold text-muted group-hover:border-accent/50 transition-colors">
                        {emp.avatar}
                      </div>
                      <span className={cn(
                        "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0B0B0B]",
                        emp.status === 'Online' ? "bg-green-500" : emp.status === 'Away' ? "bg-yellow-500" : "bg-gray-500"
                      )} />
                    </div>
                    <button className="text-muted hover:text-text transition-colors">
                      <MoreVertical size={20} />
                    </button>
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
                  <th className="px-6 py-4 font-medium">Employee</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Productivity</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
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
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full border flex items-center gap-1.5 w-max",
                        emp.status === 'Online' ? "bg-green-500/10 border-green-500/20 text-green-500" : 
                        emp.status === 'Away' ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-500" : 
                        "bg-gray-500/10 border-gray-500/20 text-muted"
                      )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", emp.status === 'Online' ? "bg-green-500" : emp.status === 'Away' ? "bg-yellow-500" : "bg-gray-500")} />
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-glass-hover rounded-full overflow-hidden w-24">
                          <div className="h-full bg-accent shadow-[0_0_8px_var(--theme-accent)]" style={{ width: `${emp.productivity}%` }} />
                        </div>
                        <span className="text-xs font-mono text-muted">{emp.productivity}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-muted hover:text-text transition-colors">
                        <MoreVertical size={16} />
                      </button>
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
