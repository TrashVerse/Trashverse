// pages/forgotten.jsx
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10">
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">Reset Password</h1>
        <form onSubmit={handleReset} className="flex flex-col gap-4 w-3/4 mx-auto">
          <input type="email" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} required className="input"/>
          <button type="submit" className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}