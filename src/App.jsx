import { useState } from "react";

export default function App() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState("dashboard");

  // 🔮 Horoscope Page
  if (page === "horoscope") {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <button 
          onClick={() => setPage("dashboard")}
          className="mb-4 bg-gray-700 px-4 py-2 rounded"
        >
          ⬅ Back
        </button>
        <h1 className="text-2xl">🔮 Horoscope Page</h1>
      </div>
    );
  }

  // 📊 Chart Page
  if (page === "chart") {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <button 
          onClick={() => setPage("dashboard")}
          className="mb-4 bg-gray-700 px-4 py-2 rounded"
        >
          ⬅ Back
        </button>
        <h1 className="text-2xl">📊 Birth Chart Page</h1>
      </div>
    );
  }

  // 💎 Premium Page
  if (page === "premium") {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <button 
          onClick={() => setPage("dashboard")}
          className="mb-4 bg-gray-700 px-4 py-2 rounded"
        >
          ⬅ Back
        </button>
        <h1 className="text-2xl">💎 Premium Page</h1>
      </div>
    );
  }

  // 🚀 Dashboard
  if (started) {
    return (
      <div className="min-h-screen bg-black text-white p-6">

        <h1 className="text-2xl font-bold mb-6">
          🚀 Dashboard
        </h1>

        <div className="grid gap-4">

          <div 
            onClick={() => setPage("horoscope")}
            className="bg-white/10 p-4 rounded-xl cursor-pointer hover:scale-105 transition"
          >
            🔮 Daily Horoscope
          </div>

          <div 
            onClick={() => setPage("chart")}
            className="bg-white/10 p-4 rounded-xl cursor-pointer hover:scale-105 transition"
          >
            📊 Birth Chart
          </div>

          <div 
            onClick={() => setPage("premium")}
            className="bg-white/10 p-4 rounded-xl cursor-pointer hover:scale-105 transition"
          >
            💎 Premium Predictions
          </div>

        </div>

      </div>
    );
  }

  // 🏠 Home Screen
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
