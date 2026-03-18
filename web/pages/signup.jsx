import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container-x bg-white shadow-xl rounded-2xl p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-600 text-center mb-6 sm:mb-8">
          Create an Account
        </h1>

        <form className="w-3/4 flex flex-col gap-4 sm:gap-6">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Password with show/hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm sm:text-base"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition text-sm sm:text-base"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm sm:text-base text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
