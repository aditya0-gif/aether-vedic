import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#03010a] text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-700 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-700 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-4">
          Aether Vedic ✨
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto mb-6 text-sm md:text-base">
          Discover your destiny through ancient wisdom and modern insight.
          A premium astrology experience designed for clarity, beauty, and precision.
        </p>

        <div className="flex gap-4 justify-center">
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition">
            Get Started
          </button>

          <button className="px-6 py-2 rounded-full border border-gray-600 hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>
      </motion.div>

    </div>
  );
}
