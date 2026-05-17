import { motion } from 'framer-motion';
import { Users, Clock, Calendar as CalendarIcon, Zap, AlertCircle, Brain, Terminal, Activity, TrendingUp } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MetricWidget from '../components/MetricWidget';
import NeonProgressRing from '../components/NeonProgressRing';
import GlowButton from '../components/GlowButton';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import profilePic from '../assets/profile picture.png';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

function UserDashboard({ user }) {
  return (
    <>
      {/* 1. Identity Hub */}
      <motion.div variants={item} className="xl:col-span-1 md:col-span-2">
        <GlassCard className="h-full flex flex-col items-center text-center p-8 relative overflow-hidden group">
          <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-accent/10 to-transparent" />
          
          <div className="relative w-28 h-28 mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-accent/50 animate-[spin_3s_linear_infinite_reverse]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-600 rounded-full overflow-hidden border-2 border-border flex items-center justify-center z-10 bg-card">
              <img src={user?.avatar || profilePic} alt={user?.name || 'User'} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-bg z-20 shadow-[0_0_10px_#22C55E]" />
          </div>

          <h2 className="text-2xl font-bold text-text mb-1">{user?.name}</h2>
          <p className="text-accent font-mono text-sm mb-6 glow-text uppercase">{user?.title} // {user?.role}</p>
          
          <div className="w-full flex gap-3 mt-auto">
            <Link to="/profile" className="flex-1">
              <GlowButton className="w-full text-sm py-2">Profile</GlowButton>
            </Link>
            <GlowButton variant="secondary" className="flex-1 text-sm py-2">Settings</GlowButton>
          </div>
        </GlassCard>
      </motion.div>

      {/* 2. Productivity Core */}
      <motion.div variants={item} className="xl:col-span-2 md:col-span-2">
        <GlassCard className="h-full flex flex-col justify-center items-center relative p-8">
          <div className="absolute right-8 top-8 text-border opacity-50">
            <Zap size={120} />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12 z-10 w-full justify-center">
            <NeonProgressRing percentage={88} size={200} />
            <div className="space-y-6">
              <div>
                <h3 className="text-muted font-mono text-sm mb-2 uppercase tracking-widest">Efficiency Status</h3>
                <p className="text-2xl font-semibold text-text">Optimal Performance</p>
                <p className="text-muted text-sm mt-1">Sustained high output across active projects.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-glass border border-border px-4 py-2 rounded-lg">
                  <p className="text-xs text-muted font-mono">TASKS DONE</p>
                  <p className="text-xl font-bold text-text">124</p>
                </div>
                <div className="bg-glass border border-border px-4 py-2 rounded-lg">
                  <p className="text-xs text-muted font-mono">HOURS LOGGED</p>
                  <p className="text-xl font-bold text-accent">42</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* 3. Leave Management */}
      <motion.div variants={item} className="xl:col-span-1 md:col-span-1">
        <MetricWidget 
          title="Leaves Pending" 
          value="05" 
          subtitle="/ 24 Total"
          icon={CalendarIcon} 
          trend={-2}
          className="h-full"
        />
      </motion.div>

      {/* 4. Current Projects Terminal */}
      <motion.div variants={item} className="xl:col-span-4 md:col-span-3">
        <GlassCard className="h-full font-mono">
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <Terminal className="text-muted" size={20} />
            <h3 className="text-sm font-semibold text-muted">SYSTEM.PROJECTS // MY_TASKS</h3>
          </div>
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'AURA-UI', status: 'ACTIVE', progress: 65, color: '#22C55E' },
              { id: 'PAYMENT-API', status: 'TESTING', progress: 92, color: 'var(--theme-accent)' },
              { id: 'AUTH-V2', status: 'REVIEW', progress: 40, color: '#F59E0B' },
            ].map(proj => (
              <div key={proj.id} className="group cursor-pointer bg-glass p-4 rounded-xl border border-border">
                <div className="flex justify-between text-xs mb-4">
                  <span className="text-text flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: proj.color }}></span>
                    {proj.id}
                  </span>
                  <span style={{ color: proj.color }}>[{proj.status}]</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${proj.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: proj.color, boxShadow: `0 0 10px ${proj.color}` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </>
  );
}

function AdminDashboard({ user }) {
  return (
    <>
      <motion.div variants={item} className="xl:col-span-4 mb-2">
        <div className="flex justify-between items-center bg-accent/10 border border-accent/20 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Activity className="text-accent" />
            <span className="text-text font-semibold">SYSTEM CONTROLLER ACTIVE</span>
          </div>
          <span className="text-sm font-mono text-muted">WELCOME, {user?.name?.toUpperCase()}</span>
        </div>
      </motion.div>

      <motion.div variants={item} className="xl:col-span-1 md:col-span-2">
        <MetricWidget 
          title="Total Workforce" 
          value="142" 
          subtitle="Active Employees"
          icon={Users} 
          trend={+12}
          className="h-full"
        />
      </motion.div>

      <motion.div variants={item} className="xl:col-span-1 md:col-span-2">
        <MetricWidget 
          title="Global Efficiency" 
          value="94%" 
          subtitle="System Average"
          icon={TrendingUp} 
          trend={+4.2}
          className="h-full"
        />
      </motion.div>

      <motion.div variants={item} className="xl:col-span-1 md:col-span-2">
        <MetricWidget 
          title="Active Projects" 
          value="24" 
          subtitle="In Progress"
          icon={Terminal} 
          trend={0}
          className="h-full"
        />
      </motion.div>

      <motion.div variants={item} className="xl:col-span-1 md:col-span-2">
        <MetricWidget 
          title="Leave Requests" 
          value="18" 
          subtitle="Requires Approval"
          icon={Clock} 
          trend={-5}
          className="h-full"
        />
      </motion.div>

      {/* AI Insights Panel */}
      <motion.div variants={item} className="xl:col-span-4 md:col-span-4">
        <GlassCard className="h-full">
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <Brain className="text-accent" size={24} />
            <h3 className="text-lg font-semibold text-text tracking-wide">GLOBAL AURA INSIGHTS</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-glass border border-border hover:border-accent/30 transition-colors group">
              <div className="p-2 bg-accent/10 rounded-lg text-accent group-hover:scale-110 transition-transform">
                <Zap size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text">Engineering Velocity Up</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">The Frontend team has increased PR merge speed by 15% this week. Consider commendation.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-glass border border-border hover:border-red-500/30 transition-colors group">
              <div className="p-2 bg-red-500/10 rounded-lg text-red-500 group-hover:scale-110 transition-transform">
                <AlertCircle size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text">Resource Bottleneck</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">Project 'PAYMENT-API' is falling behind schedule due to high QA rejection rates.</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  );
}

export default function Dashboard() {
  const { user, isAdmin } = useAuth();

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {isAdmin ? <AdminDashboard user={user} /> : <UserDashboard user={user} />}
    </motion.div>
  );
}
