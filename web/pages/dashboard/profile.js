import DashboardLayout from "../../components/DashboradLayout";
import { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Wisdom",
    email: "akobunduwisdom0@gmail.com",
    phone: "07026368679",
  });

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-2xl shadow max-w-md">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>

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

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
}