import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, Activity, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MetricWidget from '../components/MetricWidget';

const performanceData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 78 },
  { name: 'Mar', value: 72 },
  { name: 'Apr', value: 89 },
  { name: 'May', value: 85 },
  { name: 'Jun', value: 95 },
  { name: 'Jul', value: 110 },
];

const attendanceData = [
  { day: 'Mon', present: 42, absent: 3 },
  { day: 'Tue', present: 45, absent: 0 },
  { day: 'Wed', present: 41, absent: 4 },
  { day: 'Thu', present: 44, absent: 1 },
  { day: 'Fri', present: 39, absent: 6 },
];

const radarData = [
  { subject: 'Coding', A: 120, fullMark: 150 },
  { subject: 'Review', A: 98, fullMark: 150 },
  { subject: 'Comm.', A: 86, fullMark: 150 },
  { subject: 'Design', A: 99, fullMark: 150 },
  { subject: 'Speed', A: 85, fullMark: 150 },
  { subject: 'Quality', A: 65, fullMark: 150 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text tracking-tight">System Analytics</h1>
        <p className="text-sm text-muted mt-1">Detailed performance and productivity metrics.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricWidget title="Total Revenue Value" value="$2.4M" subtitle="YTD" icon={TrendingUp} trend={12.5} />
        <MetricWidget title="Active Employees" value="45" icon={Users} trend={2.1} />
        <MetricWidget title="Avg. Productivity" value="88%" icon={Activity} trend={5.4} />
        <MetricWidget title="Avg. Hours/Week" value="38.5" icon={Clock} trend={-1.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <GlassCard className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-text">Productivity Trends</h3>
            <select className="bg-glass border border-border text-sm rounded-lg px-3 py-1 text-muted outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--theme-accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--theme-accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" tick={{fill: '#6B7280', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" tick={{fill: '#6B7280', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0B0B', borderColor: 'rgba(255,212,0,0.2)', borderRadius: '12px' }}
                  itemStyle={{ color: 'var(--theme-accent)' }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--theme-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Radar Chart */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-text mb-6">Team Skill Matrix</h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#9CA3AF', fontSize: 12}} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="A" stroke="var(--theme-accent)" fill="var(--theme-accent)" fillOpacity={0.2} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0B0B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Bar Chart */}
        <GlassCard className="lg:col-span-3">
          <h3 className="text-lg font-semibold text-text mb-6">Weekly Attendance</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#6B7280" tick={{fill: '#6B7280', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" tick={{fill: '#6B7280', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{ backgroundColor: '#0B0B0B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="present" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
