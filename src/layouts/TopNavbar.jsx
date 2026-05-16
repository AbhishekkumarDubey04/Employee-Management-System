import { useState, useEffect } from 'react';
import { Search, Bell, Sparkles, ChevronDown, Moon, Sun, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import profilePic from '../assets/profile picture.png';

export default function TopNavbar({ sidebarOpen }) {
  const [time, setTime] = useState(new Date());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="fixed top-0 right-0 h-20 bg-glass backdrop-blur-xl border-b border-border z-40 flex items-center justify-between px-8 transition-all duration-300" style={{ left: sidebarOpen ? '260px' : '80px' }}>
      
      {/* Search Input */}
      <div className="relative w-96 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search employees, projects, or commands..." 
          className="w-full bg-black/10 dark:bg-black/40 border border-border rounded-full py-2.5 pl-12 pr-4 text-sm text-text placeholder-muted focus:outline-none focus:border-accent/50 focus:bg-glass focus:shadow-[0_0_15px_rgba(255,212,0,0.1)] transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-glass rounded text-[10px] text-muted border border-border">⌘ K</div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 relative">
        {/* Clock */}
        <div className="text-sm font-mono text-muted border-r border-border pr-6">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>

        {/* AI Assistant */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 px-4 py-2 rounded-full text-sm font-medium hover:bg-accent/20 hover:shadow-[0_0_15px_rgba(255,212,0,0.2)] transition-all"
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
        <div className="relative">
          <div 
            className="flex items-center gap-3 pl-6 border-l border-border cursor-pointer group"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-600 border border-border overflow-hidden relative flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User size={20} className="text-white" />
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-text group-hover:text-accent transition-colors">{user?.name || 'Guest'}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted">{user?.title || 'Unknown Role'}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${user?.role === 'ADMIN' ? 'bg-accent/20 text-accent' : 'bg-blue-500/20 text-blue-500'}`}>
                  {user?.role || 'GUEST'}
                </span>
              </div>
            </div>
            <ChevronDown 
              size={16} 
              className={`text-muted group-hover:text-text transition-all duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} 
            />
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-[calc(100%+16px)] w-64 bg-card backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-text">{user?.name || 'Guest'}</p>
                  <p className="text-xs text-muted font-mono mt-0.5">{user?.email || 'No email'}</p>
                </div>
                
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-muted hover:text-text hover:bg-glass-hover flex items-center gap-2 transition-colors">
                    <User size={16} />
                    My Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-muted hover:text-text hover:bg-glass-hover flex items-center gap-2 transition-colors">
                    <Settings size={16} />
                    Account Settings
                  </button>
                </div>

                <div className="py-2 border-t border-border">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </header>
  );
}
