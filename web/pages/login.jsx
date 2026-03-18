// pages/login.jsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      if (data.token) localStorage.setItem("trashverse_token", data.token);

      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-80 sm:w-96">
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">TrashVerse Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="input"/>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required className="input"/>
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? "Hide" : "Show"}</button>
          </div>

          <button type="submit" className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">Login</button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          <Link href="/forgotten" className="text-green-600">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}