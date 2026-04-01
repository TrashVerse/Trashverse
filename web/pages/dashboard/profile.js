import { useState, useEffect } from "react";
import { BASE_URL, getAuthHeader } from "../../utils/api";
import { User, Mail, Phone, Lock, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import DashboardLayout from "../../components/DashboardLayout";


export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${BASE_URL}/api/user/profile`, {
          headers: { ...getAuthHeader() },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setUser({ ...user, avatar: file });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);

      if (user.avatar instanceof File) {
        formData.append("avatar", user.avatar);
      }

      const res = await fetch(`${BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: { ...getAuthHeader() },
        body: formData,
      });

      if (!res.ok) throw new Error();
      setMessage("Profile updated successfully");
    } catch {
      setMessage("Failed to update profile");
    }
  };

  const handlePasswordChange = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/user/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(passwords),
      });

      if (!res.ok) throw new Error();
      setMessage("Password updated successfully");
      setPasswords({ current: "", new: "" });
    } catch {
      setMessage("Failed to update password");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-zinc-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">

        {/* TITLE */}
        <h2 className="text-3xl font-bold  text-white ml-12 mb-12">My Profile</h2>

        {message && (
          <p className="text-emerald-400 mb-6">{message}</p>
        )}

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-16">
          <label className="cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
              {preview || user.avatar ? (
                <Image
                  src={preview || user.avatar}
                  alt="avatar"
                  width={112}
                  height={112}
                  className="object-cover"
                />
              ) : (
                <ImageIcon className="text-zinc-400" />
              )}
            </div>
            <input type="file" hidden onChange={handleImageChange} />
          </label>
          <p className="text-sm text-zinc-500 mt-4">
            Tap to change picture
          </p>
        </div>

        {/* PROFILE SECTION */}
        <div className="space-y-10">

          {/* NAME */}
          <div>
            <label className="text-zinc-400 text-sm mb-3 block">Name</label>
            <div className="flex items-center bg-zinc-900 rounded-xl px-5 py-4 gap-4">
              <User className="w-5 text-zinc-400" />
              <input
                className="bg-transparent w-full outline-none text-base"
                value={user.name}
                onChange={(e) =>
                  setUser({ ...user, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-zinc-400 text-sm mb-3 block">Email</label>
            <div className="flex items-center bg-zinc-900 rounded-xl px-5 py-4 gap-4">
              <Mail className="w-5 text-zinc-400" />
              <input
                className="bg-transparent w-full outline-none text-base"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="text-zinc-400 text-sm mb-3 block">Phone</label>
            <div className="flex items-center bg-zinc-900 rounded-xl px-5 py-4 gap-4">
              <Phone className="w-5 text-zinc-400" />
              <input
                className="bg-transparent w-full outline-none text-base"
                value={user.phone}
                onChange={(e) =>
                  setUser({ ...user, phone: e.target.value })
                }
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-emerald-600 py-4 rounded-xl text-lg mt-4 hover:bg-emerald-700 transition"
          >
            Save Changes
          </button>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-zinc-800 my-16"></div>

        {/* PASSWORD SECTION */}
        <div className="space-y-10">
          <h3 className="text-xl font-semibold">Change Password</h3>

          {/* CURRENT PASSWORD */}
          <div>
            <label className="text-zinc-400 text-sm mb-3 block">
              Current Password
            </label>
            <div className="flex items-center bg-zinc-900 rounded-xl px-5 py-4 gap-4">
              <Lock className="w-5 text-zinc-400" />
              <input
                type="password"
                className="bg-transparent w-full outline-none"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    current: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="text-zinc-400 text-sm mb-3 block">
              New Password
            </label>
            <div className="flex items-center bg-zinc-900 rounded-xl px-5 py-4 gap-4">
              <Lock className="w-5 text-zinc-400" />
              <input
                type="password"
                className="bg-transparent w-full outline-none"
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    new: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            onClick={handlePasswordChange}
            className="w-full bg-emerald-600 py-4 rounded-xl text-lg hover:bg-emerald-700 transition"
          >
            Update Password
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}