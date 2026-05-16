import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function GlassCard({ children, className, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : {}}
      className={cn(
        "bg-card backdrop-blur-xl border border-border rounded-2xl p-6",
        "shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
