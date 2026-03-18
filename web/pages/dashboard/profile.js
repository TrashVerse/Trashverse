// pages/dashboard/profile.jsx
import DashboardLayout from "../../components/DashboardLayout";
import { useState, useEffect } from "react";
import { BASE_URL, getAuthHeader } from "../../utils/api";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch user profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${BASE_URL}/api/user/profile`, {
          headers: { ...getAuthHeader() },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
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

  const handleSave = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>

        {message && <p className="mb-3 text-green-600">{message}</p>}

        <input
          className="w-full mb-3 p-2 border rounded"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />

        <button
          onClick={handleSave}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
}