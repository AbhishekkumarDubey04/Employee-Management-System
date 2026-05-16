import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, CalendarCheck, Clock, FolderKanban, 
  UsersRound, LineChart, Banknote, Calendar, MessageSquare, 
  Hash as Slack, Bell, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/employees', label: 'Employees', icon: Users },
  { path: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { path: '/leaves', label: 'Leaves', icon: Clock },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
  { path: '/teams', label: 'Teams', icon: UsersRound },
  { path: '/analytics', label: 'Analytics', icon: LineChart },
  { path: '/payroll', label: 'Payroll', icon: Banknote },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/messages', label: 'Messages', icon: MessageSquare },
  { path: '/slack', label: 'Slack', icon: Slack, isSlack: true },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <motion.aside
      animate={{ width: isOpen ? 260 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-glass backdrop-blur-xl border-r border-border flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.1)]"
    >
      <div className="flex items-center justify-between p-6">
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD400] to-yellow-600 shadow-[0_0_15px_rgba(255,212,0,0.4)] flex items-center justify-center">
                <span className="text-black font-bold text-lg leading-none">A</span>
              </div>
              <span className="text-xl font-bold tracking-widest text-text glow-text">AURA</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-2 rounded-lg hover:bg-glass-hover text-muted hover:text-text transition-colors",
            !isOpen && "mx-auto"
          )}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        <nav className="flex flex-col gap-2 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 relative group",
                isActive 
                  ? "bg-glass-hover text-[#FFD400] glow-border" 
                  : "text-muted hover:text-text hover:bg-glass",
                item.isSlack && isActive && "!text-[#E01E5A] !glow-border shadow-[0_0_15px_rgba(224,30,90,0.2)]"
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav" 
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FFD400] rounded-r-full shadow-[0_0_10px_#FFD400]" 
                    />
                  )}
                  <item.icon size={22} className={cn("shrink-0", item.isSlack && !isActive && "text-[#4A154B] dark:text-[#4A154B]")} />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-medium whitespace-nowrap text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* Bottom Profile Area if needed */}
    </motion.aside>
  );
}
