import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { loginAsAdmin, loginAsUser } = useAuth();

  const handleAuth = (e) => {
    e.preventDefault();
    loginAsAdmin(); // Default to admin if they type manually
    navigate('/dashboard');
  };

  const handleDemoAdmin = () => {
    loginAsAdmin();
    navigate('/dashboard');
  };

  const handleDemoUser = () => {
    loginAsUser();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500 opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30 mask-image:linear-gradient(to_bottom,white,transparent)" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl flex rounded-3xl overflow-hidden border border-border shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10"
      >
        {/* Left Side - Brand / Info */}
        <div className="hidden lg:flex w-1/2 bg-black/40 backdrop-blur-3xl p-16 flex-col justify-between relative border-r border-border">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-600 shadow-[0_0_15px_rgba(255,212,0,0.4)] flex items-center justify-center">
                <span className="text-black font-bold text-xl leading-none">A</span>
              </div>
              <span className="text-2xl font-bold tracking-widest text-text glow-text">AURA</span>
            </div>
            
            <h1 className="text-4xl font-bold text-text mb-6 leading-tight">
              Enterprise <br/>
              <span className="text-accent glow-text">Intelligence</span> <br/>
              Platform.
            </h1>
            <p className="text-muted text-lg max-w-sm leading-relaxed">
              Experience the cinematic future of team management and productivity tracking.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted font-mono">
            <span>SYSTEM.VERSION // 2.4.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
            <span>OPERATIONAL</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 bg-card backdrop-blur-3xl p-8 sm:p-16 flex flex-col justify-center">
          <div className="max-w-sm w-full mx-auto">
            <h2 className="text-3xl font-bold text-text mb-2">
              {isLogin ? 'Welcome back' : 'Initialize account'}
            </h2>
            <p className="text-muted mb-8">
              {isLogin ? 'Enter your credentials to access the terminal.' : 'Request platform access from your administrator.'}
            </p>

            {/* Demo Buttons */}
            <div className="flex gap-3 mb-6">
              <button 
                onClick={handleDemoAdmin}
                className="flex-1 py-2 bg-accent/10 border border-accent/20 text-accent rounded-lg text-sm font-medium hover:bg-accent/20 transition-colors"
                type="button"
              >
                Demo Admin
              </button>
              <button 
                onClick={handleDemoUser}
                className="flex-1 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors"
                type="button"
              >
                Demo User
              </button>
            </div>

            <div className="relative flex items-center py-2 mb-6">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink-0 mx-4 text-muted text-xs uppercase">Or sign in manually</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full bg-glass border border-border rounded-xl py-3 pl-12 pr-4 text-text placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-glass-hover transition-all"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input 
                  type="email" 
                  placeholder="Corporate Email" 
                  required
                  className="w-full bg-glass border border-border rounded-xl py-3 pl-12 pr-4 text-text placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-glass-hover transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  required
                  className="w-full bg-glass border border-border rounded-xl py-3 pl-12 pr-4 text-text placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-glass-hover transition-all"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end pt-1">
                  <a href="#" className="text-xs text-muted hover:text-accent transition-colors">Forgot password?</a>
                </div>
              )}

              <GlowButton className="w-full py-3 mt-4 text-lg flex items-center justify-center gap-2 group" type="submit">
                {isLogin ? 'Authenticate' : 'Request Access'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </GlowButton>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted text-sm">
                {isLogin ? "Don't have access? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-text hover:text-accent transition-colors font-medium underline underline-offset-4"
                >
                  {isLogin ? 'Request account' : 'Sign in instead'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
