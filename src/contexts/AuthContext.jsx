import { createContext, useContext, useState, useEffect } from 'react';
import profilePic from '../assets/profile picture.png';

const AuthContext = createContext();

const DEMO_USERS = {
  ADMIN: {
    id: 1,
    name: 'Abhishek Kumar',
    email: 'abhishek@aura.ai',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'Oct 2023',
    role: 'ADMIN',
    title: 'Java Full Stack Developer',
    department: 'Engineering',
    bio: 'Lead engineer overseeing backend architecture and system performance. Specializing in high-availability systems and data integration.',
    avatar: profilePic
  },
  USER: {
    id: 2,
    name: 'Emily Davis',
    email: 'emily@aura.ai',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    joinDate: 'Jan 2024',
    role: 'USER',
    title: 'Frontend Engineer',
    department: 'Design Systems',
    bio: 'Passionate about building intuitive and accessible user interfaces. Currently leading the UI component library migration.',
    avatar: null
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('aura_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('aura_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aura_user');
    }
  }, [user]);

  const loginAsAdmin = () => setUser(DEMO_USERS.ADMIN);
  const loginAsUser = () => setUser(DEMO_USERS.USER);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, loginAsUser, logout, isAuthenticated: !!user, isAdmin: user?.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
