export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 text-white p-6">
      
      <h1 className="text-3xl font-bold mb-6">🔮 Your Cosmic Dashboard</h1>

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
        <h2 className="text-xl mb-2">Today's Insight</h2>
        <p className="text-gray-300">
          The stars suggest a moment of clarity and growth. Focus on your inner strength today.
        </p>
      </div>

      <div className="mt-6 bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
        <h2 className="text-xl mb-2">🔒 Premium Feature</h2>
        <p className="text-gray-400">Login to unlock full astrology chart & predictions.</p>
      </div>

    </div>
  );
}
