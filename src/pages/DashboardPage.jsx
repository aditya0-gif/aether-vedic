import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-6">🔮 Free Astrology Insights</h1>

      {/* FREE TOOL 1 */}
      <div className="bg-white/10 p-6 rounded-xl mb-4">
        <h2 className="text-xl mb-2">Today's Horoscope</h2>
        <p className="text-gray-300">
          A powerful day for clarity. Focus on your goals.
        </p>
      </div>

      {/* FREE TOOL 2 */}
      <div className="bg-white/10 p-6 rounded-xl mb-4">
        <h2 className="text-xl mb-2">Personality Insight</h2>
        <p className="text-gray-300">
          You are intuitive, creative, and naturally strategic.
        </p>
      </div>

      {/* LOCKED TOOL */}
      <div className="bg-white/5 p-6 rounded-xl text-center">
        <h2 className="text-xl mb-2">🔒 Full Birth Chart</h2>
        <p className="text-gray-400 mb-4">
          Unlock your full astrology report.
        </p>

        <button
          onClick={() => setShowPopup(true)}
          className="px-6 py-2 bg-purple-600 rounded-full"
        >
          Unlock Now ✨
        </button>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60"
              onClick={() => setShowPopup(false)}
            />

            <motion.div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white/10 p-6 rounded-xl text-center">
                <h2 className="text-xl mb-4">Create Account 🔐</h2>

                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-purple-600 rounded-full mr-2"
                >
                  Register
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 border rounded-full"
                >
                  Login
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
