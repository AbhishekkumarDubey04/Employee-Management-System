import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // true while checking saved token

  // ─── On mount: restore session from localStorage token ──
  useEffect(() => {
    const token = localStorage.getItem('aura_token');
    if (!token) { setLoading(false); return; }

    authApi.me()
      .then(res => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('aura_token');
        localStorage.removeItem('aura_user');
      })
      .finally(() => setLoading(false));
  }, []);

  // ─── Login ───────────────────────────────────────────────
  const login = async (email, password) => {
    const res = await authApi.login(email, password);
    const { user, token } = res.data;
    localStorage.setItem('aura_token', token);
    localStorage.setItem('aura_user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  // ─── Register ────────────────────────────────────────────
  const register = async (data) => {
    const res = await authApi.register(data);
    const { user, token } = res.data;
    localStorage.setItem('aura_token', token);
    localStorage.setItem('aura_user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  // ─── Logout ──────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('aura_token');
    localStorage.removeItem('aura_user');
    setUser(null);
  };

  // ─── Update profile ──────────────────────────────────────
  const updateProfile = async (data) => {
    const res = await authApi.updateProfile(data);
    setUser(res.data.user);
    return res.data.user;
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isUser:  user?.role === 'USER',
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
