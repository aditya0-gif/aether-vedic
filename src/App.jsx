import { useState } from "react";

export default function App() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState("dashboard");

  const [sign, setSign] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const getHoroscope = async () => {
    if (!sign) return alert("Select zodiac sign");

    setLoading(true);
    setResult("");

    try {
      const res = await fetch(
        `https://ohmanda.com/api/horoscope/${sign}`
      );

      const data = await res.json();

      setResult(data.horoscope);

    } catch (err) {
      setResult("Error fetching horoscope");
    }

    setLoading(false);
  };

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

        <h1 className="text-2xl mb-6">🔮 Horoscope</h1>

        <select
          value={sign}
          onChange={(e) => setSign(e.target.value)}
          className="w-full p-3 rounded bg-white/10 mb-4"
        >
          <option value="">Select Zodiac</option>
          <option value="aries">Aries</option>
          <option value="taurus">Taurus</option>
          <option value="gemini">Gemini</option>
          <option value="cancer">Cancer</option>
          <option value="leo">Leo</option>
          <option value="virgo">Virgo</option>
          <option value="libra">Libra</option>
          <option value="scorpio">Scorpio</option>
          <option value="sagittarius">Sagittarius</option>
          <option value="capricorn">Capricorn</option>
          <option value="aquarius">Aquarius</option>
          <option value="pisces">Pisces</option>
        </select>

        <button 
          onClick={getHoroscope}
          className="bg-purple-600 px-6 py-2 rounded"
        >
          {loading ? "🔮 Reading stars..." : "Get Horoscope"}
        </button>

        {result && (
          <div className="mt-6 bg-gradient-to-br from-purple-700/20 to-blue-700/20 p-5 rounded-2xl border border-white/10 shadow-lg">
            {result}
          </div>
        )}

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

  // 🏠 Home
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
