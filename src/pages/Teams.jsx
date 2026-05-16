import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users, FolderKanban, TrendingUp, Shield } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MetricWidget from '../components/MetricWidget';
import { cn } from '../lib/utils';

const teams = [
  {
    id: 1, name: 'Core Engineering', color: '#10B981', lead: 'Abhishek Kumar', project: 'AURA Platform v2',
    members: [
      { name: 'Abhishek Kumar', role: 'Lead Engineer', status: 'Online', initial: 'A' },
      { name: 'Emily Davis', role: 'Frontend Engineer', status: 'Online', initial: 'E' },
      { name: 'Michael Brown', role: 'Backend Engineer', status: 'Away', initial: 'M' },
    ],
    progress: 72, sprint: 'Sprint 14', tasks: { done: 18, total: 25 },
  },
  {
    id: 2, name: 'Design Systems', color: '#8B5CF6', lead: 'Sarah Miller', project: 'Design Token Migration',
    members: [
      { name: 'Sarah Miller', role: 'Lead Designer', status: 'In a meeting', initial: 'S' },
    ],
    progress: 55, sprint: 'Sprint 13', tasks: { done: 11, total: 20 },
  },
  {
    id: 3, name: 'Product & Growth', color: '#F59E0B', lead: 'James Wilson', project: 'Q2 Roadmap Execution',
    members: [
      { name: 'James Wilson', role: 'Product Manager', status: 'Offline', initial: 'J' },
      { name: 'Jessica Taylor', role: 'HR Manager', status: 'Online', initial: 'J' },
    ],
    progress: 40, sprint: 'Sprint 12', tasks: { done: 8, total: 20 },
  },
];

const statusColor = { Online: '#22C55E', Away: '#F59E0B', Offline: '#6B7280', 'In a meeting': '#3B82F6' };

function TeamCard({ team }) {
  const [open, setOpen] = useState(false);
  return (
    <GlassCard className="overflow-hidden p-0" hover={false}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: team.color, boxShadow: `0 0 20px ${team.color}40` }}>
              {team.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-text">{team.name}</h3>
              <p className="text-xs text-muted">{team.sprint} · {team.project}</p>
            </div>
          </div>
          <button onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-glass-hover text-muted hover:text-text transition-colors">
            <ChevronDown size={16} className={cn('transition-transform duration-300', open && 'rotate-180')} />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted font-mono">SPRINT PROGRESS</span>
            <span className="text-text font-bold">{team.tasks.done}/{team.tasks.total} tasks</span>
          </div>
          <div className="h-2 bg-glass-hover rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${team.progress}%` }}
              transition={{ duration: 1, delay: 0.3 }} className="h-full rounded-full"
              style={{ backgroundColor: team.color }} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {team.members.map((m, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-bg flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: team.color + '80' }}>
                {m.initial}
              </div>
            ))}
          </div>
          <span className="text-xs text-muted">{team.members.length} member{team.members.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="border-t border-border p-6 space-y-3">
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Team Members</p>
              {team.members.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-glass border border-border">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: team.color + '60' }}>
                        {m.initial}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card"
                        style={{ backgroundColor: statusColor[m.status] || '#6B7280' }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">{m.name}</p>
                      <p className="text-xs text-muted">{m.role}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted">{m.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Teams() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-text tracking-tight">Teams</h1>
        <p className="text-sm text-muted mt-1">Manage team composition, leads, and project assignments.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricWidget title="Active Teams" value={teams.length.toString()} icon={Users} trend={0} />
        <MetricWidget title="Total Members" value={teams.reduce((a, t) => a + t.members.length, 0).toString()} icon={Shield} trend={2} />
        <MetricWidget title="Active Projects" value={teams.length.toString()} icon={FolderKanban} trend={1} />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map(team => <TeamCard key={team.id} team={team} />)}
      </motion.div>
    </motion.div>
  );
}
