import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { getProfile } from './api.js';

// ─── Auth Context ──────────────────────────────────────────────────────────
export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// ─── Toast Context ─────────────────────────────────────────────────────────
export const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const location = useLocation();

  // Show toast
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Rehydrate auth from localStorage
  useEffect(() => {
    const token = localStorage.getItem('aether_token');
    if (!token) { setAuthLoading(false); return; }
    getProfile()
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem('aether_token'))
      .finally(() => setAuthLoading(false));
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('aether_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('aether_token');
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const data = await getProfile();
      setUser(data.user);
    } catch (_) {}
  };

  if (authLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#03010a' }}>
        <div className="star-field" />
        <div className="nebula-orb nebula-orb-1" />
        <div className="nebula-orb nebula-orb-2" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <div className="float-anim text-5xl mb-4">🔮</div>
          <p className="font-cinzel text-amethyst-300 tracking-widest text-sm uppercase">
            Consulting the Stars…
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      <ToastContext.Provider value={{ showToast }}>
        <div className="relative min-h-screen">
          {/* Ambient background */}
          <div className="star-field" />
          <div className="nebula-orb nebula-orb-1" />
          <div className="nebula-orb nebula-orb-2" />
          <div className="nebula-orb nebula-orb-3" />

          {/* Page routes */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <LandingPage />
                </motion.div>
              } />
              <Route path="/login" element={
                user ? <Navigate to="/dashboard" replace /> :
                <motion.div key="login" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <LoginPage />
                </motion.div>
              } />
              <Route path="/register" element={
                user ? <Navigate to="/dashboard" replace /> :
                <motion.div key="register" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <RegisterPage />
                </motion.div>
              } />
              <Route path="/dashboard/*" element={
                !user ? <Navigate to="/login" replace /> :
                <motion.div key="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <DashboardPage />
                </motion.div>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>

          {/* Toast */}
          <AnimatePresence>
            {toast && (
              <motion.div
                key={toast.id}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className={`toast toast-${toast.type}`}
              >
                <span className="mr-2">{toast.type === 'success' ? '✦' : '⚠'}</span>
                {toast.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ToastContext.Provider>
    </AuthContext.Provider>
  );
}
