import { useState } from "react";
import { BASE_URL } from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to send reset link");
      alert("Reset link sent! Check your email.");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-green-900 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Trashverse</h1>
        <p className="text-lg opacity-80 text-center max-w-sm">
          Smart waste management for a cleaner, greener future 🌱
        </p>
      </div>

      {/* Right panel */}
      <div className="w-[95%] md:w-1/2 flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full h-50 max-w-md">
      <div className="bg-white shadow-xl justify-center items-center mt-20 rounded-2xl p-6 h-50 sm:p-10">
        <h1 className="text-2xl mt-20 font-bold text-green-600 text-center mb-6">Reset Password</h1>
        <form onSubmit={handleReset} className="flex flex-col mt-20 gap-4 w-3/4 mx-auto w-full">
          <input type="email" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} required className="input"/>
          <sedbutton type="submit" className="bg-green-600 text-white py-3 rounded-lg w-50 h-8  justify-center font-medium hover:bg-green-700">Send Reset Link</sedbutton>
        </form>
      </div>
        </div>
      </div>

    </div>
  );
}