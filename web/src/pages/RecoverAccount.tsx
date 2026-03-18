import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function RecoverAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [recovered, setRecovered] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Link</h1>
          <p className="text-gray-600 mb-6">
            The account recovery link is invalid or has expired.
          </p>
          <Link
            to="/login"
            className="text-green-600 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleRecover = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      // Verify the recovery token
      await api.post("/api/auth/verify-recovery-token", { token });

      setRecovered(true);
      setMessage("Account verified! You can now reset your password.");
      setTimeout(() => navigate("/reset-password?token=" + token), 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to recover account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-600 text-center mb-2">
          Recover Account
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          Click the button below to verify your identity and recover your account
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

        {!recovered && (
          <button
            onClick={handleRecover}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify & Recover Account"}
          </button>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          <Link to="/login" className="text-green-600 hover:underline font-medium">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}