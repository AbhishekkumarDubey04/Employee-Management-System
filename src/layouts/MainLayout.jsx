import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { motion } from 'framer-motion';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-bg text-text flex overflow-hidden transition-colors duration-300">
      {/* Background ambient light */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FFD400] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-500 opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

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
