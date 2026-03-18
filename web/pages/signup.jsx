// pages/sign-up.jsx
import { useState } from "react";
import Link from "next/link";
import { BASE_URL } from "../utils/api";
import { useRouter } from "next/router";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error("Signup failed");

      const data = await res.json();

      // Save token if backend returns JWT
      if (data.token) localStorage.setItem("trashverse_token", data.token);

      alert("Signup successful!");
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container-x bg-white shadow-xl rounded-2xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-8">Create an Account</h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-4 w-3/4 mx-auto">
          <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required className="input"/>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="input"/>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required className="input"/>
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? "Hide" : "Show"}</button>
          </div>

          <button type="submit" className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">Sign Up</button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          Already have an account? <Link href="/login" className="text-green-600">Login</Link>
        </p>
      </div>
    </div>
  );
}