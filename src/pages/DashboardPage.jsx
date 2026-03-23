import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 text-white p-6 relative">

      <h1 className="text-3xl font-bold mb-6">🔮 Your Cosmic Insight</h1>

      {/* FREE CONTENT */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 mb-6">
        <h2 className="text-xl mb-2">Today's Prediction</h2>
        <p className="text-gray-300">
          You are entering a phase of clarity. A decision you've been avoiding
          will soon become obvious.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 mb-6">
        <h2 className="text-xl mb-2">Your Personality</h2>
        <p className="text-gray-300">
          You have strong intuitive energy and natural leadership qualities.
        </p>
      </div>

      {/* LOCKED FEATURE */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
        <h2 className="text-xl mb-2">🔒 Full Birth Chart</h2>
        <p className="text-gray-400 mb-4">
          Unlock your complete astrology chart and future predictions.
        </p>

        <button
          onClick={() => setShowPopup(true)}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition"
        >
          Unlock Now ✨
        </button>
      </div>

      {/* 🔥 POPUP */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setShowPopup(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">

                <h2 className="text-2xl font-bold mb-4">
                  Unlock Your Destiny ✨
                </h2>

                <p className="text-gray-300 mb-6">
                  Create a free account to access your full astrology chart and deep insights.
                </p>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => navigate("/register")}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition"
                  >
                    Register
                  </button>

                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 rounded-full border border-gray-400 hover:bg-white hover:text-black transition"
                  >
                    Login
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
