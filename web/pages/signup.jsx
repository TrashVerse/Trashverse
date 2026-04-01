// pages/sign-up.jsx
import { useState } from "react";
import Link from "next/link";
import { BASE_URL } from "../utils/api";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { nigeriaData } from "../utils/nigeriaData";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    lga: "",
    address: "",
    password: "",
    confirmPassword: "",
    photo: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const getPasswordStrength = (password) => {
    if (!password) return "";

    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    if (password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*])/))  return "Strong";

    return "Strong";
  }
  const strength = getPasswordStrength(form.password);
  const [loading, setLoading] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const res = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        body: formData, // IMPORTANT (not JSON anymore)
      });

      const data = await res.json();
      if (!res.ok) toast.error("Signup failed! Please check your details and try again.");

      if (data.token) {
        localStorage.setItem("trashverse_token", data.token);
      }
      toast.success("Signup successful!");

      router.push("/dashboard");
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-green-900 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">TrashVerse</h1>
        <p className="text-lg opacity-80 text-center max-w-sm">
          Smart waste management for a cleaner, greener future 🌱
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50">
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md sm:p-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
            Create an Account
          </h1>

<form onSubmit={handleSignup} className="flex flex-col gap-4">

  {/* PROFILE IMAGE */}
  <div className="flex flex-col items-center">
    <label className="cursor-pointer">
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 hover:border-green-500 transition">
        {form.photo ? (
          <img
            src={URL.createObjectURL(form.photo)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-500 text-center px-2">
            Upload Photo
          </span>
        )}
      </div>
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  </div>

  {/* FULL NAME */}
  <input
    name="name"
    placeholder="Name"
    onChange={handleChange}
    className="input"
    required
  />

  {/* PHONE */}
  <input
    name="phone"
    placeholder="Phone Number"
    onChange={handleChange}
    className="input"
    required
  />

  {/* EMAIL */}
  <input
    type="email"
    name="email"
    placeholder="Email Address"
    onChange={handleChange}
    className="input"
    required
  />

  {/* STATE */}
  <select
    name="state"
    value={form.state}
    onChange={(e) =>
      setForm({ ...form, state: e.target.value, lga: "" })
    }
    className="input"
    required
  >
    <option value="">Select State</option>
    {Object.keys(nigeriaData).map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>

  {/* LGA */}
  <select
    name="lga"
    value={form.lga}
    onChange={handleChange}
    className="input"
    required
    disabled={!form.state}
  >
    <option value="">Select LGA</option>
    {form.state &&
      nigeriaData[form.state].map((lga) => (
        <option key={lga} value={lga}>
          {lga}
        </option>
      ))}
  </select>

  {/* ADDRESS */}
  <textarea
    name="address"
    placeholder="Address"
    onChange={handleChange}
    className="input"
    required
  />

  {/* PASSWORD */}
  <divpass className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Create Password"
      onChange={handleChange}
      className="input pr-12"
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-20 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-green-600 transition"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </divpass>
  {form.password && (
  <pstr
    className={`text-sm ${
      strength === "Weak"
        ? "text-red-500"
        : strength === "Medium"
        ? "text-yellow-500"
        : "text-green-600"
    }`}
  >
    Password strength: {strength}
  </pstr>
)}

  {/* CONFIRM PASSWORD */}
  <divpass className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      name="confirmPassword"
      placeholder="Confirm Password"
      onChange={handleChange}
      className="input pr-12"
      required
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute right-20 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-green-600 transition"
    >
      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </divpass>
  <divpass>
  {/* BUTTON */}
<button
  disabled={loading}
  className="bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition w-80 h-10 flex justify-center items-center"
>
  {loading ? (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    "Create Account"
  )}
</button>
  </divpass>
</form>

          <p className="text-center mt-2 text-gray-500 mb-2">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}