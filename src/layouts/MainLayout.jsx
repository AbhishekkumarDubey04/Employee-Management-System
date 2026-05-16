import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { motion } from 'framer-motion';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-bg text-text flex overflow-hidden transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <TopNavbar sidebarOpen={sidebarOpen} />
      
      <main 
        className="flex-1 transition-all duration-300 h-screen overflow-y-auto custom-scrollbar relative pt-20"
        style={{ marginLeft: sidebarOpen ? '260px' : '80px' }}
      >
        <div className="p-8 pb-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
