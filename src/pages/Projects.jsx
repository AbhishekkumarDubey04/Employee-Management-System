import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreHorizontal, Clock, MessageSquare, Paperclip } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { cn } from '../lib/utils';

const initialColumns = [
  { id: 'todo', title: 'TODO', color: '#F59E0B', tasks: [
    { id: 't1', title: 'Design System Architecture', tag: 'Core', date: 'Oct 24', comments: 3, attachments: 1, users: ['A', 'S'] },
    { id: 't2', title: 'Implement JWT Auth', tag: 'Backend', date: 'Oct 25', comments: 5, attachments: 0, users: ['E'] }
  ]},
  { id: 'inprogress', title: 'IN PROGRESS', color: '#3B82F6', tasks: [
    { id: 't3', title: 'Dashboard UI Components', tag: 'Frontend', date: 'Oct 22', comments: 12, attachments: 4, users: ['A', 'J'] },
    { id: 't4', title: 'Slack Integration API', tag: 'API', date: 'Oct 23', comments: 2, attachments: 0, users: ['M'] }
  ]},
  { id: 'review', title: 'IN REVIEW', color: '#FFD400', tasks: [
    { id: 't5', title: 'Employee Directory Module', tag: 'Frontend', date: 'Oct 20', comments: 8, attachments: 2, users: ['S'] }
  ]},
  { id: 'done', title: 'DONE', color: '#22C55E', tasks: [
    { id: 't6', title: 'Database Schema Setup', tag: 'Backend', date: 'Oct 15', comments: 1, attachments: 0, users: ['E', 'M'] }
  ]}
];

export default function Projects() {
  const [columns, setColumns] = useState(initialColumns);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-text tracking-tight">Active Projects</h1>
          <p className="text-sm text-muted mt-1">Kanban sprint board.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#FFD400] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 min-w-max h-full">
          {columns.map((col) => (
            <div key={col.id} className="w-[320px] flex flex-col h-full shrink-0">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.color, boxShadow: `0 0 10px ${col.color}` }} />
                  <h3 className="font-mono text-sm font-semibold text-text tracking-wider">{col.title}</h3>
                  <span className="text-xs bg-glass-hover px-2 py-0.5 rounded-full text-muted">{col.tasks.length}</span>
                </div>
                <button className="text-muted hover:text-text"><MoreHorizontal size={18} /></button>
              </div>

              <div className="flex-1 bg-glass border border-border rounded-2xl p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                {col.tasks.map((task) => (
                  <GlassCard key={task.id} className="p-4 cursor-grab active:cursor-grabbing hover:border-[#FFD400]/30 transition-colors" hover={false}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-mono px-2 py-1 rounded bg-glass text-muted border border-border">
                        {task.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-text mb-4 leading-snug">{task.title}</h4>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-xs text-muted">
                          <span className="flex items-center gap-1 hover:text-text transition-colors"><MessageSquare size={12} /> {task.comments}</span>
                          <span className="flex items-center gap-1 hover:text-text transition-colors"><Paperclip size={12} /> {task.attachments}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted">
                          <Clock size={12} /> {task.date}
                        </div>
                      </div>
                      
                      <div className="flex -space-x-2">
                        {task.users.map((user, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-black flex items-center justify-center text-[10px] font-bold text-muted">
                            {user}
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
