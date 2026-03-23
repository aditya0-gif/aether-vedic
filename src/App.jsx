import { useState } from "react";

export default function App() {
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <div className="min-h-screen bg-black text-white p-6">

        <h1 className="text-2xl font-bold mb-6">
          🚀 Dashboard
        </h1>

        <div className="grid gap-4">

          <div className="bg-white/10 p-4 rounded-xl">
            🔮 Daily Horoscope
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            📊 Birth Chart
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            💎 Premium Predictions
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 flex items-center justify-center">

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl">

        <h1 className="text-3xl font-bold text-white mb-4">
          ✨ Aether Vedic
        </h1>

        <p className="text-gray-300 mb-6">
          Welcome to your premium astrology dashboard 🚀
        </p>

        <button
          onClick={() => setStarted(true)}
          className="bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-lg text-white"
        >
          Get Started
        </button>

      </div>

    </div>
  );
}
