import { useState } from "react";
import { Link } from "react-router-dom";

export default function Forgotten() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white h-50 rounded-2xl flex flex-col justify-center items-center shadow-xl p-6 sm:p-8 w-80 sm:w-96">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-green-600">Reset Password</h1>
        </div>

        <form className="w-3/4 flex flex-col gap-3 sm:gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 border border-gray-200 rounded px-3 text-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-300"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-md text-white font-medium bg-gradient-to-b from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition shadow-md"
          >
            Send Reset Link
          </button>
        </form>

        <div className="w-3/4 mx-auto mt-6">
          <div className="border-t border-gray-100" />
          <p className="text-center text-sm sm:text-base text-gray-500 mt-4">
            Remembered your password?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
