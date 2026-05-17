import GlassCard from './GlassCard';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function MetricWidget({ title, value, subtitle, icon: Icon, trend, className }) {
  return (
    <GlassCard className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-start justify-between">
        <div className="p-3 bg-glass rounded-xl border border-border text-muted">
          <Icon size={20} />
        </div>
        {trend && (
          <div className={cn(
            "text-xs font-semibold px-2 py-1 rounded-full",
            trend > 0 ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#EF4444]/10 text-[#EF4444]"
          )}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-muted text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-text tracking-tight">{value}</span>
          {subtitle && <span className="text-xs text-muted opacity-80">{subtitle}</span>}
        </div>
      </div>
    </GlassCard>
  );
}
