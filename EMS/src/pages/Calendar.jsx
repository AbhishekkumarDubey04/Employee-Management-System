import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Briefcase, Building } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { cn } from '../lib/utils';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// Events: type can be 'leave', 'deadline', 'event'
const events = [
  { date: '2026-05-10', label: 'Sarah — Sick Leave', type: 'leave' },
  { date: '2026-05-11', label: 'Sarah — Sick Leave', type: 'leave' },
  { date: '2026-05-15', label: 'James — Casual Leave', type: 'leave' },
  { date: '2026-05-20', label: 'AURA v2 Deadline', type: 'deadline' },
  { date: '2026-05-23', label: 'Michael — Earned Leave', type: 'leave' },
  { date: '2026-05-01', label: 'Company Foundation Day', type: 'event' },
  { date: '2026-05-19', label: 'Q2 Sprint Review', type: 'event' },
  { date: '2026-05-28', label: 'Payment API Release', type: 'deadline' },
  { date: '2026-05-25', label: 'Jessica — Unpaid Leave', type: 'leave' },
  { date: '2026-05-26', label: 'Jessica — Unpaid Leave', type: 'leave' },
];

const typeStyle = {
  leave:    { dot: 'bg-yellow-500', badge: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: CalIcon },
  deadline: { dot: 'bg-red-500',    badge: 'bg-red-500/10 text-red-500 border-red-500/20',         icon: Briefcase },
  event:    { dot: 'bg-blue-500',   badge: 'bg-blue-500/10 text-blue-500 border-blue-500/20',       icon: Building },
};

function getEventsForDate(y, m, d) {
  const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  return events.filter(e => e.date === dateStr);
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function OrgCalendar() {
  const [current, setCurrent] = useState(new Date(2026, 4, 1)); // May 2026
  const [selected, setSelected] = useState(null);

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const selectedEvents = selected ? getEventsForDate(year, month, selected) : [];

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-text tracking-tight">Organization Calendar</h1>
        <p className="text-sm text-muted mt-1">Employee leaves, project deadlines, and company events in one view.</p>
      </motion.div>

      {/* Legend */}
      <motion.div variants={item} className="flex gap-4 flex-wrap">
        {Object.entries(typeStyle).map(([type, s]) => (
          <span key={type} className={cn('flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border font-medium', s.badge)}>
            <span className={cn('w-2 h-2 rounded-full', s.dot)} />
            {type.charAt(0).toUpperCase() + type.slice(1) + (type === 'leave' ? 's' : type === 'deadline' ? 's' : 's')}
          </span>
        ))}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text">{MONTHS[month]} {year}</h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrent(new Date(year, month - 1, 1))}
                className="p-2 hover:bg-glass-hover rounded-lg text-muted hover:text-text transition-colors"><ChevronLeft size={18} /></button>
              <button onClick={() => setCurrent(new Date(year, month + 1, 1))}
                className="p-2 hover:bg-glass-hover rounded-lg text-muted hover:text-text transition-colors"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => <div key={d} className="text-center text-xs font-mono text-muted uppercase py-2">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className="h-20" />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDate(year, month, day);
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = selected === day;

              return (
                <motion.div key={day} whileHover={{ scale: 1.03 }} onClick={() => setSelected(selected === day ? null : day)}
                  className={cn(
                    'h-20 p-1.5 rounded-xl border cursor-pointer transition-colors overflow-hidden',
                    isSelected ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/30 hover:bg-glass',
                    isToday && 'ring-2 ring-accent ring-offset-1 ring-offset-bg'
                  )}>
                  <span className={cn('text-xs font-bold block mb-1', isToday ? 'text-accent' : 'text-text')}>{day}</span>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map((ev, j) => (
                      <div key={j} className={cn('text-[9px] px-1 py-0.5 rounded truncate font-medium', typeStyle[ev.type].badge)}>
                        {ev.label}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] text-muted px-1">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Day Events */}
          {selected && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-mono text-muted uppercase mb-3">Events on {MONTHS[month]} {selected}</p>
              {selectedEvents.length === 0 ? (
                <p className="text-sm text-muted">No events on this day.</p>
              ) : (
                <div className="space-y-2">
                  {selectedEvents.map((ev, i) => {
                    const Icon = typeStyle[ev.type].icon;
                    return (
                      <div key={i} className={cn('flex items-center gap-3 p-3 rounded-xl border text-sm', typeStyle[ev.type].badge)}>
                        <Icon size={16} />
                        {ev.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </GlassCard>

        {/* Upcoming Events Sidebar */}
        <GlassCard>
          <h3 className="font-semibold text-text mb-6">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((ev, i) => {
              const Icon = typeStyle[ev.type].icon;
              const d = new Date(ev.date);
              return (
                <div key={i} className="flex gap-3 items-start">
                  <div className={cn('p-2 rounded-lg border shrink-0', typeStyle[ev.type].badge)}>
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text leading-tight">{ev.label}</p>
                    <p className="text-xs text-muted mt-0.5">{d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
