import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';

export default function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text mb-2">{title}</h1>
        <p className="text-muted">Manage and view your {title.toLowerCase()} details here.</p>
      </div>
      
      <GlassCard className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 rounded-full bg-glass border border-border flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-[#FFD400]/50">🚧</span>
          </div>
          <h2 className="text-2xl font-semibold text-text mb-2">{title} Module</h2>
          <p className="text-muted max-w-md">
            This module is currently under construction. 
            The cinematic executive dashboard will be implemented soon.
          </p>
        </motion.div>
      </GlassCard>
    </div>
  );
}
