import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { getProfile } from './api.js';

// ─── Auth Context ─────────────────────────────────────────
export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// ─── Toast Context ────────────────────────────────────────
export const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

// ─── Page Animations ──────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const location = useLocation();

  // ─── Toast Function ────────────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // ─── Load user from token ──────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('aether_token');

    if (!token) {
      setAuthLoading(false);
      return;
    }

    getProfile()
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('aether_token');
      })
      .finally(() => setAuthLoading(false));
  }, []);

  // ─── Auth functions ────────────────────────────────────
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
    } catch (e) {}
  };

  // ─── Loading screen ────────────────────────────────────
  if (authLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#03010a' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-4xl mb-4">🔮</div>
          <p className="text-purple-300">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      <ToastContext.Provider value={{ showToast }}>
        <div className="relative min-h-screen">

          {/* ROUTES */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

              <Route path="/" element={
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <LandingPage />
                </motion.div>
              } />

              <Route path="/login" element={
                user ? <Navigate to="/dashboard" /> :
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <LoginPage />
                </motion.div>
              } />

              <Route path="/register" element={
                user ? <Navigate to="/dashboard" /> :
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <RegisterPage />
                </motion.div>
              } />

              <Route path="/dashboard/*" element={
                !user ? <Navigate to="/login" /> :
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <DashboardPage />
                </motion.div>
              } />

              <Route path="*" element={<Navigate to="/" />} />

            </Routes>
          </AnimatePresence>

          {/* TOAST */}
          <AnimatePresence>
            {toast && (
              <motion.div
                key={toast.id}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg text-white shadow-lg ${
                  toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {toast.message}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </ToastContext.Provider>
    </AuthContext.Provider>
  );
}
