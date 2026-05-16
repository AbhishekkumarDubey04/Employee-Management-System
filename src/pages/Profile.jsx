import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { Mail, Phone, MapPin, Calendar, Building, User as UserIcon, Shield } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* Header Profile Banner */}
      <motion.div variants={item}>
        <GlassCard className="relative overflow-hidden p-0 border-0">
          <div className="h-48 bg-gradient-to-r from-accent/20 via-blue-500/10 to-accent/20 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30" />
          </div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 relative z-10">
              <div className="w-32 h-32 rounded-2xl bg-card border-4 border-bg overflow-hidden shadow-xl flex items-center justify-center shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={48} className="text-muted" />
                )}
              </div>
              
              <div className="flex-1 mb-2">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <h1 className="text-3xl font-bold text-text">{user.name}</h1>
                  {user.role === 'ADMIN' && (
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-accent/10 text-accent border border-accent/20 w-fit">
                      <Shield size={12} /> System Admin
                    </span>
                  )}
                </div>
                <p className="text-lg text-muted mt-1">{user.title}</p>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <GlowButton className="flex-1 md:flex-none">Edit Profile</GlowButton>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Contact & Details */}
        <motion.div variants={item} className="space-y-6">
          <GlassCard>
            <h3 className="text-sm font-semibold text-text uppercase tracking-widest mb-6 border-b border-border pb-2">Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted hover:text-text transition-colors">
                <div className="p-2 bg-glass rounded-lg shrink-0">
                  <Mail size={18} className="text-accent" />
                </div>
                <span className="text-sm break-all">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted hover:text-text transition-colors">
                <div className="p-2 bg-glass rounded-lg shrink-0">
                  <Phone size={18} className="text-accent" />
                </div>
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted hover:text-text transition-colors">
                <div className="p-2 bg-glass rounded-lg shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <span className="text-sm">{user.location}</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-semibold text-text uppercase tracking-widest mb-6 border-b border-border pb-2">Employment Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted">
                <div className="p-2 bg-glass rounded-lg shrink-0">
                  <Building size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase">Department</p>
                  <p className="text-sm text-text">{user.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <div className="p-2 bg-glass rounded-lg shrink-0">
                  <Calendar size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase">Date Joined</p>
                  <p className="text-sm text-text">{user.joinDate}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Right Column: Bio & Activity */}
        <motion.div variants={item} className="md:col-span-2 space-y-6">
          <GlassCard>
            <h3 className="text-sm font-semibold text-text uppercase tracking-widest mb-4 border-b border-border pb-2">About Me</h3>
            <p className="text-muted text-sm leading-relaxed">
              {user.bio}
            </p>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-semibold text-text uppercase tracking-widest mb-6 border-b border-border pb-2">Recent Activity</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-bg bg-accent text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                  <svg className="fill-current w-3 h-3" viewBox="0 0 12 12"><path d="M5.999 0h-.002A5.993 5.993 0 0 0 0 6a5.993 5.993 0 0 0 5.997 6h.002A5.993 5.993 0 0 0 12 6a5.993 5.993 0 0 0-6.001-6Zm3.334 4.88-4.225 4.316a.434.434 0 0 1-.616 0l-2.15-2.193a.434.434 0 0 1 0-.61l.617-.62a.428.428 0 0 1 .61 0l1.229 1.253 3.308-3.376a.428.428 0 0 1 .61 0l.618.62a.434.434 0 0 1 0 .61Z" /></svg>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-border bg-glass shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-text text-sm">Merged PR #421</div>
                    <time className="font-mono text-xs text-accent">Just now</time>
                  </div>
                  <div className="text-muted text-xs">Updated main dashboard layout and styles.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-bg bg-glass border-border text-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                  <svg className="fill-current w-3 h-3" viewBox="0 0 12 12"><path d="M5.999 0h-.002A5.993 5.993 0 0 0 0 6a5.993 5.993 0 0 0 5.997 6h.002A5.993 5.993 0 0 0 12 6a5.993 5.993 0 0 0-6.001-6Zm3.334 4.88-4.225 4.316a.434.434 0 0 1-.616 0l-2.15-2.193a.434.434 0 0 1 0-.61l.617-.62a.428.428 0 0 1 .61 0l1.229 1.253 3.308-3.376a.428.428 0 0 1 .61 0l.618.62a.434.434 0 0 1 0 .61Z" /></svg>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-border bg-glass shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-text text-sm">Approved leave request</div>
                    <time className="font-mono text-xs text-muted">2 hours ago</time>
                  </div>
                  <div className="text-muted text-xs">Approved PTO for Sarah Jenkins.</div>
                </div>
              </div>

            </div>
          </GlassCard>
        </motion.div>
      </div>

    </motion.div>
  );
}
