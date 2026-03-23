import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Pages
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <Routes>
      {/* 🏠 Public */}
      <Route path="/" element={<LandingPage user={user} />} />

      {/* 🔓 Only if NOT logged in */}
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
      />

      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />}
      />

      {/* 🔐 Protected */}
      <Route
        path="/dashboard"
        element={user ? <DashboardPage /> : <Navigate to="/login" />}
      />

      {/* 🚫 Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
