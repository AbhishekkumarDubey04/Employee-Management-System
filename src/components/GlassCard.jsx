import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function GlassCard({ children, className, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "bg-card backdrop-blur-[40px] border border-border rounded-2xl p-6",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
