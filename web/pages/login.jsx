// pages/login.jsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation - in a real app, you'd check against a backend
    if (email && password) {
      // Simulate successful login
      router.push("/dashboard");
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white h-80 w-70 rounded-2xl flex flex-col justify-center items-center shadow-xl p-6 sm:p-8 w-80 sm:w-96">
        <div className="flex flex-row items-center justify-center">
          <img src="/images/logo.png" alt="TrashVerse Logo" className="w-12 h-10 mb-2" />
          <h1 className="text-xl sm:text-2xl font-bold text-green-600">Trashverse Login</h1>
        </div>

        <h2 className="text-base sm:text-lg text-gray-700 mb-6 text-center font-medium">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="w-3/4 flex flex-col gap-3 sm:gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 border border-gray-200 rounded mr-4 text-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-300"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 border border-gray-200 rounded px-10 text-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-md bg-gradient-to-b from-green-600 to-green-500 text-white font-medium shadow-md hover:from-green-700 hover:to-green-600 transition"
          >
            Login
          </button>
        </form>

        <div className="w-3/4 mx-auto mt-4">
          <div className="border-t border-gray-100" />
          <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
            <Link href="/forgotten" className="hover:text-green-600 mr-2 pr-2 border-r border-gray-300">
              Forgot Password?
            </Link>
            <Link href="/sign-in" className="hover:text-green-600">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
