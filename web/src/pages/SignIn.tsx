import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white h-100 w-85 sm:w-96 rounded-2xl flex flex-col justify-center items-center shadow-xl p-6 sm:p-8 w-80 sm:w-96">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-green-600">Create an Account</h1>
        </div>

        <form className="w-3/4 flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full h-10 border border-gray-200 rounded px-3 text-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-300"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-10 border border-gray-200 rounded px-3 text-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-300"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-10 border border-gray-200 rounded px-3 text-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-md text-white font-medium bg-gradient-to-b from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition shadow-md"
          >
            Sign Up
          </button>
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
