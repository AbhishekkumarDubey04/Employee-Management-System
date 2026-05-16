import { motion } from 'framer-motion';
import { Users, Clock, Calendar as CalendarIcon, Zap, CheckCircle2, AlertCircle, Brain, Terminal } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MetricWidget from '../components/MetricWidget';
import NeonProgressRing from '../components/NeonProgressRing';
import GlowButton from '../components/GlowButton';
import { cn } from '../lib/utils';
import profilePic from '../assets/profile picture.png';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {/* 1. Identity Hub */}
      <motion.div variants={item} className="xl:col-span-1 md:col-span-2">
        <GlassCard className="h-full flex flex-col items-center text-center p-8 relative overflow-hidden group">
          <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#FFD400]/10 to-transparent" />
          
          <div className="relative w-28 h-28 mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-[#FFD400]/30 animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-[#FFD400]/50 animate-[spin_3s_linear_infinite_reverse]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-600 rounded-full overflow-hidden border-2 border-black z-10">
              <img src={profilePic} alt="Abhishek Kumar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-black z-20 shadow-[0_0_10px_#22C55E]" />
          </div>

          <h2 className="text-2xl font-bold text-text mb-1">Abhishek Kumar</h2>
          <p className="text-[#FFD400] font-mono text-sm mb-6 glow-text">JAVA FULL STACK DEVELOPER // DATA</p>
          
          <div className="w-full flex gap-3 mt-auto">
            <GlowButton className="flex-1 text-sm py-2">Profile</GlowButton>
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
                <p className="text-muted text-sm mt-1">Sustained high output across 3 active projects.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-glass border border-border px-4 py-2 rounded-lg">
                  <p className="text-xs text-muted font-mono">CODE COMMITS</p>
                  <p className="text-xl font-bold text-text">124</p>
                </div>
                <div className="bg-glass border border-border px-4 py-2 rounded-lg">
                  <p className="text-xs text-muted font-mono">PRS MERGED</p>
                  <p className="text-xl font-bold text-[#FFD400]">42</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* 4. Leave Management */}
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

      {/* 7. AI Insights Panel */}
      <motion.div variants={item} className="xl:col-span-2 md:col-span-3">
        <GlassCard className="h-full">
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <Brain className="text-[#FFD400]" size={24} />
            <h3 className="text-lg font-semibold text-text tracking-wide">AURA INSIGHTS</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-glass border border-border hover:border-[#FFD400]/30 transition-colors group">
              <div className="p-2 bg-[#FFD400]/10 rounded-lg text-[#FFD400] group-hover:scale-110 transition-transform">
                <Zap size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text">Peak Productivity Detected</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">Your coding speed increases by 24% during late evening hours. Consider shifting deep work sessions.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-glass border border-border hover:border-red-500/30 transition-colors group">
              <div className="p-2 bg-red-500/10 rounded-lg text-red-500 group-hover:scale-110 transition-transform">
                <AlertCircle size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text">Burnout Warning</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">Continuous commits for 6 hours. AI recommends a 15-minute mandatory screen break.</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* 6. Current Projects Terminal */}
      <motion.div variants={item} className="xl:col-span-2 md:col-span-3">
        <GlassCard className="h-full font-mono">
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <Terminal className="text-muted" size={20} />
            <h3 className="text-sm font-semibold text-muted">SYSTEM.PROJECTS // ACTIVE</h3>
          </div>
          <div className="space-y-4">
            {[
              { id: 'AURA-UI', status: 'ACTIVE', progress: 65, color: '#22C55E' },
              { id: 'PAYMENT-API', status: 'TESTING', progress: 92, color: '#FFD400' },
              { id: 'AUTH-V2', status: 'REVIEW', progress: 40, color: '#F59E0B' },
            ].map(proj => (
              <div key={proj.id} className="group cursor-pointer">
                <div className="flex justify-between text-xs mb-2">
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

    </motion.div>
  );
}
