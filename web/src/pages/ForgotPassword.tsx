import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/auth/forgot-password", { email });
      setMessage("Password reset link has been sent to your email. Check your inbox!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-600 text-center mb-2">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          Enter your email and we'll send you a link to reset your password
        </p>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-green-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
