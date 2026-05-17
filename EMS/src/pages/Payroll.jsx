import { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, Users, Download, CheckCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MetricWidget from '../components/MetricWidget';
import { cn } from '../lib/utils';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const payrollData = [
  { id: 1, name: 'Abhishek Kumar', dept: 'Engineering', role: 'Java Full Stack Developer', basic: 85000, hra: 34000, bonus: 10000, pf: 10200, tax: 8500, status: 'Paid' },
  { id: 2, name: 'Sarah Miller', dept: 'Design', role: 'UX Designer', basic: 72000, hra: 28800, bonus: 5000, pf: 8640, tax: 6200, status: 'Paid' },
  { id: 3, name: 'James Wilson', dept: 'Product', role: 'Product Manager', basic: 90000, hra: 36000, bonus: 15000, pf: 10800, tax: 11000, status: 'Pending' },
  { id: 4, name: 'Emily Davis', dept: 'Engineering', role: 'Frontend Engineer', basic: 78000, hra: 31200, bonus: 8000, pf: 9360, tax: 7800, status: 'Paid' },
  { id: 5, name: 'Michael Brown', dept: 'Engineering', role: 'Backend Engineer', basic: 82000, hra: 32800, bonus: 8000, pf: 9840, tax: 8200, status: 'Pending' },
  { id: 6, name: 'Jessica Taylor', dept: 'HR', role: 'HR Manager', basic: 68000, hra: 27200, bonus: 5000, pf: 8160, tax: 5800, status: 'Paid' },
];

const netPay = (r) => r.basic + r.hra + r.bonus - r.pf - r.tax;
const totalPayroll = payrollData.reduce((a, r) => a + netPay(r), 0);
const avgSalary = Math.round(totalPayroll / payrollData.length);
const pendingCount = payrollData.filter(r => r.status === 'Pending').length;

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Payroll() {
  const [data, setData] = useState(payrollData);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? data : data.filter(r => r.status === filter);

  const disburse = (id) => setData(prev => prev.map(r => r.id === id ? { ...r, status: 'Paid' } : r));
  const disburseAll = () => setData(prev => prev.map(r => ({ ...r, status: 'Paid' })));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text tracking-tight">Payroll</h1>
          <p className="text-sm text-muted mt-1">Manage monthly salary disbursements and payslips. (INR)</p>
        </div>
        <div className="flex gap-3">
          {pendingCount > 0 && (
            <button onClick={disburseAll}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors shadow-[0_0_20px_var(--theme-accent-subtle)]">
              <CheckCircle size={16} /> Disburse All ({pendingCount})
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-glass border border-border rounded-xl text-sm text-muted hover:text-text hover:bg-glass-hover transition-colors">
            <Download size={16} /> Export
          </button>
        </div>
      </motion.div>

      {/* Metrics */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricWidget title="Total Payroll" value={`₹${(totalPayroll / 100000).toFixed(1)}L`} subtitle="this month" icon={IndianRupee} trend={3.2} />
        <MetricWidget title="Avg. Salary" value={`₹${(avgSalary / 1000).toFixed(0)}K`} icon={TrendingUp} trend={1.8} />
        <MetricWidget title="Employees" value={payrollData.length.toString()} icon={Users} trend={0} />
        <MetricWidget title="Pending" value={data.filter(r => r.status === 'Pending').length.toString()} subtitle="disbursements" icon={CheckCircle} trend={data.filter(r => r.status === 'Pending').length > 0 ? -1 : 0} />
      </motion.div>

      {/* Filter */}
      <motion.div variants={item} className="flex gap-2">
        {['All', 'Paid', 'Pending'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
              filter === f ? 'bg-accent/10 text-accent border-accent/20' : 'text-muted border-border hover:text-text hover:bg-glass')}>
            {f}
          </button>
        ))}
      </motion.div>

      {/* Payroll Table */}
      <motion.div variants={item}>
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-mono text-muted uppercase border-b border-border bg-glass">
                  <th className="px-6 py-3">Employee</th>
                  <th className="px-6 py-3">Basic</th>
                  <th className="px-6 py-3">HRA</th>
                  <th className="px-6 py-3">Bonus</th>
                  <th className="px-6 py-3">PF</th>
                  <th className="px-6 py-3">Tax (TDS)</th>
                  <th className="px-6 py-3">Net Pay</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => {
                  const net = netPay(r);
                  return (
                    <tr key={r.id} className="border-b border-border hover:bg-glass transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-text">{r.name}</p>
                        <p className="text-xs text-muted">{r.dept}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted font-mono">{fmt(r.basic)}</td>
                      <td className="px-6 py-4 text-sm text-muted font-mono">{fmt(r.hra)}</td>
                      <td className="px-6 py-4 text-sm text-emerald-500 font-mono">+{fmt(r.bonus)}</td>
                      <td className="px-6 py-4 text-sm text-red-400 font-mono">-{fmt(r.pf)}</td>
                      <td className="px-6 py-4 text-sm text-red-400 font-mono">-{fmt(r.tax)}</td>
                      <td className="px-6 py-4 text-sm font-bold text-text">{fmt(net)}</td>
                      <td className="px-6 py-4">
                        <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium',
                          r.status === 'Paid'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                            : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20')}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {r.status === 'Pending' && (
                            <button onClick={() => disburse(r.id)}
                              className="text-xs px-3 py-1 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 transition-colors">
                              Disburse
                            </button>
                          )}
                          <button className="text-xs px-3 py-1 rounded-lg bg-glass text-muted hover:text-text hover:bg-glass-hover border border-border transition-colors">
                            Payslip
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-glass">
                  <td colSpan={6} className="px-6 py-4 text-sm font-mono text-muted uppercase">Total Disbursement</td>
                  <td className="px-6 py-4 text-sm font-bold text-accent">{fmt(filtered.reduce((a, r) => a + netPay(r), 0))}</td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
