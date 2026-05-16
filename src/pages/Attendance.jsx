import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Clock, TrendingUp, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MetricWidget from '../components/MetricWidget';
import { cn } from '../lib/utils';

const mockAttendance = [
  { id: 1, name: 'Abhishek Kumar', dept: 'Engineering', clockIn: '09:05 AM', clockOut: '06:30 PM', hours: '9h 25m', status: 'Present' },
  { id: 2, name: 'Sarah Miller', dept: 'Design', clockIn: '09:45 AM', clockOut: '06:00 PM', hours: '8h 15m', status: 'Late' },
  { id: 3, name: 'James Wilson', dept: 'Product', clockIn: null, clockOut: null, hours: '—', status: 'Absent' },
  { id: 4, name: 'Emily Davis', dept: 'Engineering', clockIn: '08:55 AM', clockOut: '05:55 PM', hours: '9h 00m', status: 'Present' },
  { id: 5, name: 'Michael Brown', dept: 'Engineering', clockIn: '10:20 AM', clockOut: '07:00 PM', hours: '8h 40m', status: 'Late' },
  { id: 6, name: 'Jessica Taylor', dept: 'HR', clockIn: '09:00 AM', clockOut: '06:00 PM', hours: '9h 00m', status: 'Present' },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

// Mock days employee was present this month
const presentDays = [1, 2, 3, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16];
const absentDays = [10, 11];
const leaveDays = [4];

function MiniCalendar() {
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () => setDate(new Date(year, month - 1, 1));
  const next = () => setDate(new Date(year, month + 1, 1));

  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-text">{MONTHS[month]} {year}</h3>
        <div className="flex gap-2">
          <button onClick={prev} className="p-1.5 hover:bg-glass-hover rounded-lg text-muted hover:text-text transition-colors"><ChevronLeft size={16} /></button>
          <button onClick={next} className="p-1.5 hover:bg-glass-hover rounded-lg text-muted hover:text-text transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-3">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-mono text-muted uppercase">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isPresent = presentDays.includes(day);
          const isAbsent = absentDays.includes(day);
          const isLeave = leaveDays.includes(day);
          const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
          return (
            <div key={day} className={cn(
              'w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium mx-auto transition-colors',
              isToday && 'ring-2 ring-accent',
              isPresent && 'bg-emerald-500/10 text-emerald-500',
              isAbsent && 'bg-red-500/10 text-red-500',
              isLeave && 'bg-yellow-500/10 text-yellow-500',
              !isPresent && !isAbsent && !isLeave && 'text-muted'
            )}>
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1.5 text-emerald-500"><span className="w-2 h-2 rounded-full bg-emerald-500" />Present</span>
        <span className="flex items-center gap-1.5 text-red-500"><span className="w-2 h-2 rounded-full bg-red-500" />Absent</span>
        <span className="flex items-center gap-1.5 text-yellow-500"><span className="w-2 h-2 rounded-full bg-yellow-500" />Leave</span>
      </div>
    </GlassCard>
  );
}

const statusStyle = {
  Present: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Late: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Absent: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Attendance() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-text tracking-tight">Attendance</h1>
        <p className="text-sm text-muted mt-1">Track daily attendance, clock-in/out and work hours.</p>
      </motion.div>

      {/* Metrics */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricWidget title="Present Today" value="38" subtitle="/ 45 total" icon={CalendarCheck} trend={2.1} />
        <MetricWidget title="Absent Today" value="04" subtitle="employees" icon={AlertCircle} trend={-1} />
        <MetricWidget title="Late Arrivals" value="03" subtitle="this week" icon={Clock} trend={0} />
        <MetricWidget title="Avg Hours/Day" value="8.6h" icon={TrendingUp} trend={1.4} />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <MiniCalendar />
        </div>

        {/* Table */}
        <GlassCard className="lg:col-span-2 p-0 overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-text">Today's Attendance Log</h3>
            <p className="text-xs text-muted mt-0.5">{new Date().toDateString()}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-mono text-muted uppercase border-b border-border bg-glass">
                  <th className="px-6 py-3">Employee</th>
                  <th className="px-6 py-3">Clock In</th>
                  <th className="px-6 py-3">Clock Out</th>
                  <th className="px-6 py-3">Hours</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAttendance.map(row => (
                  <tr key={row.id} className="border-b border-border hover:bg-glass transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-text">{row.name}</p>
                      <p className="text-xs text-muted">{row.dept}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-muted">{row.clockIn || '—'}</td>
                    <td className="px-6 py-4 text-sm font-mono text-muted">{row.clockOut || '—'}</td>
                    <td className="px-6 py-4 text-sm font-mono text-text">{row.hours}</td>
                    <td className="px-6 py-4">
                      <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', statusStyle[row.status])}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
