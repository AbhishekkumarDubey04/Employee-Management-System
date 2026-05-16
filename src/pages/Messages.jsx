import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, MoreVertical } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const contacts = [
  { id: 1, name: 'Sarah Miller', role: 'UX Designer', initial: 'S', color: '#8B5CF6', online: true,
    messages: [
      { from: 'Sarah Miller', text: 'Hey! The new Figma components are ready for review.', time: '10:22 AM', read: true },
      { from: 'me', text: 'Awesome! I\'ll check them out after standup.', time: '10:24 AM', read: true },
      { from: 'Sarah Miller', text: 'Also, should we move the design review to Thursday?', time: '10:25 AM', read: true },
    ]
  },
  { id: 2, name: 'James Wilson', role: 'Product Manager', initial: 'J', color: '#F59E0B', online: false,
    messages: [
      { from: 'James Wilson', text: 'Can you share the Q2 progress report by EOD?', time: '9:10 AM', read: true },
      { from: 'me', text: 'Will do. I\'ll send it by 5 PM.', time: '9:12 AM', read: true },
    ]
  },
  { id: 3, name: 'Emily Davis', role: 'Frontend Engineer', initial: 'E', color: '#10B981', online: true,
    messages: [
      { from: 'Emily Davis', text: 'PR #421 is ready for merge. LGTM 🚀', time: 'Yesterday', read: true },
      { from: 'me', text: 'Merged! Great work on the dashboard redesign.', time: 'Yesterday', read: true },
      { from: 'Emily Davis', text: 'Thanks! Starting on the mobile layout next.', time: 'Yesterday', read: true },
    ]
  },
  { id: 4, name: 'Michael Brown', role: 'Backend Engineer', initial: 'M', color: '#3B82F6', online: false,
    messages: [
      { from: 'Michael Brown', text: 'The API endpoint is deployed to staging.', time: 'Mon', read: true },
    ]
  },
];

export default function Messages() {
  const { user } = useAuth();
  const [convos, setConvos] = useState(contacts);
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  const active = convos.find(c => c.id === activeId);
  const filtered = convos.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [active?.messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = { from: 'me', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: false };
    setConvos(prev => prev.map(c => c.id === activeId ? { ...c, messages: [...c.messages, msg] } : c));
    setInput('');
    // Simulate reply after 1.5s
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const replies = [
        'Got it, thanks!', 'Sounds good 👍', 'I\'ll take a look shortly.',
        'Perfect, let me know if you need anything else.', 'On it!', '✅',
      ];
      const reply = { from: active.name, text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: false };
      setConvos(prev => prev.map(c => c.id === activeId ? { ...c, messages: [...c.messages, reply] } : c));
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      {/* Sidebar — Conversation List */}
      <div className="w-80 shrink-0 flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-text mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={15} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-glass border border-border rounded-xl py-2 pl-9 pr-3 text-sm text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-all" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filtered.map(c => {
            const last = c.messages.at(-1);
            return (
              <button key={c.id} onClick={() => setActiveId(c.id)}
                className={cn('w-full flex items-center gap-3 p-4 border-b border-border transition-colors text-left hover:bg-glass',
                  activeId === c.id && 'bg-glass border-l-2 border-l-accent')}>
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: c.color }}>
                    {c.initial}
                  </div>
                  {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-text truncate">{c.name}</p>
                    <span className="text-[10px] text-muted shrink-0 ml-2">{last?.time}</span>
                  </div>
                  <p className="text-xs text-muted truncate mt-0.5">
                    {last?.from === 'me' ? 'You: ' : ''}{last?.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-glass">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: active?.color }}>
                {active?.initial}
              </div>
              {active?.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />}
            </div>
            <div>
              <p className="font-semibold text-text text-sm">{active?.name}</p>
              <p className="text-xs text-muted">{active?.online ? '🟢 Online' : '⚫ Offline'}</p>
            </div>
          </div>
          <button className="text-muted hover:text-text transition-colors p-2"><MoreVertical size={18} /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          <AnimatePresence initial={false}>
            {active?.messages.map((msg, i) => {
              const isMe = msg.from === 'me';
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-[70%] flex flex-col', isMe ? 'items-end' : 'items-start')}>
                    {!isMe && <p className="text-[10px] text-muted mb-1 ml-1">{msg.from}</p>}
                    <div className={cn('px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                      isMe
                        ? 'bg-accent text-white rounded-br-sm'
                        : 'bg-glass border border-border text-text rounded-bl-sm')}>
                      {msg.text}
                    </div>
                    <p className="text-[10px] text-muted mt-1 px-1">{msg.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex justify-start">
                <div className="bg-glass border border-border px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 bg-muted rounded-full block" />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-3 items-center">
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder={`Message ${active?.name}...`}
              className="flex-1 bg-glass border border-border rounded-xl py-2.5 px-4 text-sm text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-all" />
            <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              disabled={!input.trim()}
              className="p-2.5 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <Send size={18} />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
