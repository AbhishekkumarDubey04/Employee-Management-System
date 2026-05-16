import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MoreHorizontal, Clock, MessageSquare, Paperclip, X } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { cn } from '../lib/utils';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TAGS = ['Frontend', 'Backend', 'Core', 'API', 'Design', 'QA'];
const COLS = ['todo', 'inprogress', 'review', 'done'];

const initialColumns = [
  { id: 'todo', title: 'TODO', color: '#F59E0B', tasks: [
    { id: 't1', title: 'Design System Architecture', tag: 'Core', date: 'Oct 24', comments: 3, attachments: 1, users: ['A', 'S'] },
    { id: 't2', title: 'Implement JWT Auth', tag: 'Backend', date: 'Oct 25', comments: 5, attachments: 0, users: ['E'] }
  ]},
  { id: 'inprogress', title: 'IN PROGRESS', color: '#3B82F6', tasks: [
    { id: 't3', title: 'Dashboard UI Components', tag: 'Frontend', date: 'Oct 22', comments: 12, attachments: 4, users: ['A', 'J'] },
    { id: 't4', title: 'Slack Integration API', tag: 'API', date: 'Oct 23', comments: 2, attachments: 0, users: ['M'] }
  ]},
  { id: 'review', title: 'IN REVIEW', color: 'var(--theme-accent)', tasks: [
    { id: 't5', title: 'Employee Directory Module', tag: 'Frontend', date: 'Oct 20', comments: 8, attachments: 2, users: ['S'] }
  ]},
  { id: 'done', title: 'DONE', color: '#22C55E', tasks: [
    { id: 't6', title: 'Database Schema Setup', tag: 'Backend', date: 'Oct 15', comments: 1, attachments: 0, users: ['E', 'M'] }
  ]},
];

function NewTaskModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', tag: 'Frontend', column: 'todo' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    onAdd({ ...form, id: `t-${Date.now()}`, date: today, comments: 0, attachments: 0, users: ['A'] });
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text">Create New Task</h3>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-muted uppercase mb-2">Task Title *</label>
            <input required value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Build auth middleware"
              className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-2">Tag</label>
              <select value={form.tag} onChange={e => set('tag', e.target.value)}
                className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text focus:outline-none focus:border-accent/50 transition-all">
                {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-2">Column</label>
              <select value={form.column} onChange={e => set('column', e.target.value)}
                className="w-full bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text focus:outline-none focus:border-accent/50 transition-all">
                {initialColumns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-border rounded-xl text-sm text-muted hover:text-text hover:bg-glass transition-colors">Cancel</button>
            <GlowButton type="submit" className="flex-1 py-2.5">Create Task</GlowButton>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function TaskCard({ task, isDragging }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <GlassCard className="p-4 cursor-grab active:cursor-grabbing hover:border-accent/30 transition-colors" hover={false}>
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-glass text-muted border border-border">{task.tag}</span>
        </div>
        <h4 className="text-sm font-medium text-text mb-4 leading-snug">{task.title}</h4>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1"><MessageSquare size={12} /> {task.comments}</span>
              <span className="flex items-center gap-1"><Paperclip size={12} /> {task.attachments}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted"><Clock size={12} /> {task.date}</div>
          </div>
          <div className="flex -space-x-2">
            {task.users.map((u, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-bg flex items-center justify-center text-[10px] font-bold text-muted">{u}</div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default function Projects() {
  const [columns, setColumns] = useState(initialColumns);
  const [showModal, setShowModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const findColumnByTaskId = (id) => columns.find(col => col.tasks.some(t => t.id === id));

  const handleDragStart = ({ active }) => {
    const col = findColumnByTaskId(active.id);
    setActiveTask(col?.tasks.find(t => t.id === active.id) || null);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveTask(null);
    if (!over || active.id === over.id) return;

    const sourceCol = findColumnByTaskId(active.id);
    const destCol = columns.find(c => c.id === over.id) || findColumnByTaskId(over.id);

    if (!sourceCol || !destCol) return;

    const task = sourceCol.tasks.find(t => t.id === active.id);

    setColumns(prev => prev.map(col => {
      if (col.id === sourceCol.id && col.id !== destCol.id) return { ...col, tasks: col.tasks.filter(t => t.id !== active.id) };
      if (col.id === destCol.id && col.id !== sourceCol.id) return { ...col, tasks: [task, ...col.tasks] };
      if (col.id === sourceCol.id && col.id === destCol.id) {
        const tasks = [...col.tasks];
        const fromIdx = tasks.findIndex(t => t.id === active.id);
        const toIdx = tasks.findIndex(t => t.id === over.id);
        tasks.splice(fromIdx, 1);
        tasks.splice(toIdx, 0, task);
        return { ...col, tasks };
      }
      return col;
    }));
  };

  const addTask = ({ title, tag, column, ...rest }) => {
    setColumns(prev => prev.map(col =>
      col.id === column ? { ...col, tasks: [{ title, tag, ...rest }, ...col.tasks] } : col
    ));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <AnimatePresence>
        {showModal && <NewTaskModal onClose={() => setShowModal(false)} onAdd={addTask} />}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-text tracking-tight">Active Projects</h1>
          <p className="text-sm text-muted mt-1">Kanban sprint board. Drag cards to move between columns.</p>
        </div>
        <GlowButton onClick={() => setShowModal(true)} className="flex items-center gap-2 py-2 px-4 text-sm">
          <Plus size={18} /> New Task
        </GlowButton>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
          <div className="flex gap-6 min-w-max h-full">
            {columns.map(col => (
              <div key={col.id} className="w-[320px] flex flex-col h-full shrink-0">
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.color, boxShadow: `0 0 10px ${col.color}` }} />
                    <h3 className="font-mono text-sm font-semibold text-text tracking-wider">{col.title}</h3>
                    <span className="text-xs bg-glass-hover px-2 py-0.5 rounded-full text-muted">{col.tasks.length}</span>
                  </div>
                  <button className="text-muted hover:text-text"><MoreHorizontal size={18} /></button>
                </div>
                <SortableContext items={col.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                  <div id={col.id} className="flex-1 bg-glass border border-border rounded-2xl p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar min-h-[200px]">
                    {col.tasks.map(task => (
                      <TaskCard key={task.id} task={task} isDragging={activeTask?.id === task.id} />
                    ))}
                  </div>
                </SortableContext>
              </div>
            ))}
          </div>
        </div>
        <DragOverlay>
          {activeTask && (
            <div className="rotate-3 opacity-90">
              <GlassCard className="p-4 w-[300px] shadow-2xl" hover={false}>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-glass text-muted border border-border">{activeTask.tag}</span>
                <h4 className="text-sm font-medium text-text mt-3">{activeTask.title}</h4>
              </GlassCard>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
