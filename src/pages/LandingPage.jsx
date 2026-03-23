import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-80" />

      {/* Glow Orbs */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 blur-3xl rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[600px] h-[600px] bg-blue-600 opacity-20 blur-3xl rounded-full bottom-[-200px] right-[-200px]" />

      {/* Floating Animation */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute text-white opacity-10 text-6xl"
      >
        ✦ ✧ ✦ ✧
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
          Aether Vedic ✨
        </h1>

        <p className="text-gray-300 max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
          Ancient wisdom meets modern intelligence.  
          Experience astrology in its most powerful and beautiful form.
        </p>

        <div className="flex gap-6 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-110 hover:shadow-2xl transition duration-300"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-full border border-gray-500 hover:bg-white hover:text-black transition duration-300"
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}
