import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function DashboardPage() {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out 👋");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl mb-6">Dashboard 🚀</h1>

      {/* FREE FEATURE */}
      <div className="mb-4 p-4 bg-green-600 rounded-xl">
        Free Horoscope 🌙 (Available)
      </div>

      {/* PREMIUM FEATURE */}
      <div className="mb-4 p-4 bg-purple-600 rounded-xl">
        AI Future Prediction 🔮 (Login required)
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 rounded"
      >
        Logout
      </button>

    </div>
  );
}
