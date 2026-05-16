import { useState, useEffect } from 'react';
import { Search, Bell, Sparkles, User, ChevronDown, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

import profilePic from '../assets/profile picture.png';

export default function TopNavbar({ sidebarOpen }) {
  const [time, setTime] = useState(new Date());
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 right-0 h-20 bg-glass backdrop-blur-xl border-b border-border z-40 flex items-center justify-between px-8 transition-all duration-300" style={{ left: sidebarOpen ? '260px' : '80px' }}>
      
      {/* Search Input */}
      <div className="relative w-96 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-[#FFD400] transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search employees, projects, or commands..." 
          className="w-full bg-black/10 dark:bg-black/40 border border-border rounded-full py-2.5 pl-12 pr-4 text-sm text-text placeholder-muted focus:outline-none focus:border-[#FFD400]/50 focus:bg-glass focus:shadow-[0_0_15px_rgba(255,212,0,0.1)] transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-glass rounded text-[10px] text-muted border border-border">⌘ K</div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Clock */}
        <div className="text-sm font-mono text-muted border-r border-border pr-6">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>

        {/* AI Assistant */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-[#FFD400]/10 text-[#FFD400] border border-[#FFD400]/20 px-4 py-2 rounded-full text-sm font-medium hover:bg-[#FFD400]/20 hover:shadow-[0_0_15px_rgba(255,212,0,0.2)] transition-all"
        >
          <Sparkles size={16} />
          <span>Ask AURA</span>
        </motion.button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="relative p-2 text-muted hover:text-text transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-muted hover:text-text transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-3 pl-6 border-l border-white/10 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-600 border border-white/10 overflow-hidden relative">
            <img src={profilePic} alt="Abhishek Kumar" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white group-hover:text-[#FFD400] transition-colors">Abhishek Kumar</p>
            <p className="text-xs text-gray-500">Java Full Stack Developer</p>
          </div>
          <ChevronDown size={16} className="text-gray-500 group-hover:text-white transition-colors" />
        </div>
      </div>

    </header>
  );
}
