import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function GlowButton({ children, className, variant = 'primary', ...props }) {
  const baseStyles = "relative px-6 py-3 rounded-xl font-medium tracking-wide transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow",
    secondary: "bg-glass text-text border border-border hover:bg-glass-hover shadow-sm",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
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
