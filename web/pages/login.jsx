// pages/login.jsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils/api";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";  

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Backend response:", data); // Debugging line

    if (!res.ok) {
      return toast.error(data.message || "Invalid credentials");
    }

    if (data.token) {
      localStorage.setItem("trashverse_token", data.token);
      toast.success("Login successful!");
      console.log("Login URL:", `${BASE_URL}/api/login`);
      router.push("/dashboard");
    }
  } catch (err) {
    toast.error("Network error! Please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-green-900 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Trashverse</h1>
        <p className="text-lg opacity-80 text-center max-w-sm">
          Smart waste management for a cleaner, greener future 🌱
        </p>
      </div>

      {/* RIGHT SIDE (Form) */}
      
      <divform className="w-95 md:w-1/2 flex justify-center items-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

          <h2 className="text-2xl font-semibold text-center">
            Welcome Back 
          </h2>

          <forml onSubmit={handleLogin} className="w-85 h-50 flex flex-col gap-4 justify-center">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-10 px-4 py-3  rounded-xl border focus:ring-1 focus:ring-green-500 outline-none text-center justify-center items-center"
            />

            <div className="relative justify-center items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-85 h-10 px-4 py-3 rounded-xl border focus:ring-1 focus:ring-green-500 outline-none text-center justify-center items-center"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 justify-center items-center"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              disabled={loading}
              className="bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition w-85 h-10 flex justify-center items-center"
            >
              {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
              "Login"
             )}
            </button>
          </forml>

          {/* Forgot password */}
          <p className="text-center mt-4 text-sm ">
            <Link href="/forgotten" className="text-green-600 hover:underline">
              Forgot Password?
            </Link>
          </p>

          {/* Register section */}
          <p className="text-center mt-4 text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-green-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </divform>
    </div>
  );
}
