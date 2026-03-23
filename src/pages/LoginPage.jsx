import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login 🔐</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
        />

        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition">
          Login
        </button>
      </motion.div>
    </div>
  );
}
