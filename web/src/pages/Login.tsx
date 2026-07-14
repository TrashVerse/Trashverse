import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleInputChange = useCallback((field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (error) setError(""); // Clear error when user starts typing
  }, [error]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    try {
      await login(formData.username.trim(), formData.password);
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error: any) {
      setError(error.response?.data?.detail || "Login failed. Please check your credentials.");
    }
  }, [formData, login, navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-2xl flex flex-col justify-center items-center shadow-xl p-6 sm:p-8 w-full max-w-md">
        <div className="flex flex-row items-center justify-center mb-6">
          <img src="/images/logo.png" alt="Trashverse Logo" className="w-12 h-10 mr-2" />
          <h1 className="text-xl sm:text-2xl font-bold text-green-600">Trashverse Login</h1>
        </div>

        <h2 className="text-base sm:text-lg text-gray-700 mb-6 text-center font-medium">
          Login to your account
        </h2>

        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange("username")}
            className="w-full h-12 border border-gray-200 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-300 transition-colors"
            required
            disabled={loading}
            autoComplete="username"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange("password")}
              className="w-full h-12 border border-gray-200 rounded-lg px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-300 transition-colors"
              required
              disabled={loading}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Toggle password visibility"
              disabled={loading}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.username.trim() || !formData.password.trim()}
            className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-medium shadow-md hover:from-green-700 hover:to-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-600 disabled:hover:to-green-500"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="w-full mt-6">
          <div className="border-t border-gray-100" />
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <Link 
              to="/forgot-password" 
              className="hover:text-green-600 transition-colors"
            >
              Forgot Password?
            </Link>
            <Link 
              to="/signup" 
              className="hover:text-green-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
