import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function GlowButton({ children, className, variant = 'primary', ...props }) {
  const baseStyles = "relative px-6 py-3 rounded-xl font-medium tracking-wide transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-[#FFD400] text-black hover:shadow-[0_0_20px_rgba(255,212,0,0.4)]",
    secondary: "bg-glass text-text border border-border hover:bg-glass-hover",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -z-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
      )}
    </motion.button>
  );
}
