import { useNavigate } from "react-router-dom";

export default function AuthPopup({ show, onClose }) {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-2xl w-[90%] max-w-sm text-center shadow-2xl">
        <h2 className="text-2xl font-bold mb-3">Unlock Premium 🔒</h2>

        <p className="mb-5 text-gray-600">
          Login to access this powerful feature
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full mb-3 py-2 rounded-lg bg-purple-600 text-white"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="w-full py-2 rounded-lg border"
        >
          Create Account
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
