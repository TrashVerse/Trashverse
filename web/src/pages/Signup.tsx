import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface FormData {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    full_name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = useCallback((field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (error) setError(""); // Clear error when user starts typing
    if (success) setSuccess(""); // Clear success message when user starts typing
  }, [error, success]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const validateForm = useCallback(() => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      await register({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        full_name: formData.full_name.trim(),
      });
      
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setError(error.response?.data?.detail || "Registration failed. Please try again.");
    }
  }, [formData, register, navigate, validateForm]);

  const isFormValid = formData.username.trim() && formData.email.trim() && formData.password.trim();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-8">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-600 text-center mb-6">
          Create an Account
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username *"
            value={formData.username}
            onChange={handleInputChange("username")}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            required
            disabled={loading}
            autoComplete="username"
          />
          
          <input
            type="text"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleInputChange("full_name")}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            disabled={loading}
            autoComplete="name"
          />
          
          <input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleInputChange("email")}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            required
            disabled={loading}
            autoComplete="email"
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
              value={formData.password}
              onChange={handleInputChange("password")}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              required
              disabled={loading}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
