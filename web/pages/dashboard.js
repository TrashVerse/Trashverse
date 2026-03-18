// pages/dashboard.js
import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Trash2, LogOut } from "lucide-react";
import DashboardLayout from "../components/DashboradLayout";

export default function Dashboard() {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [trashType, setTrashType] = useState("");

  const trashPrices = {
    can: 500,
    paper: 300,
    glass: 200,
    organic: 100,
  };

  const handleSchedulePickup = (e) => {
    e.preventDefault();
    alert(`Pickup scheduled for ${pickupDate} at ${pickupTime} for ${trashType} trash`);
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="container-x py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-green-600">TrashVerse</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
            <Link href="/login" className="flex items-center text-gray-600 hover:text-red-500">
              <LogOut size={18} />
            </Link>
          </div>
        </div>
      </header>

      <div className="container-x py-8">

        {/* TOP STATS */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-md">
            <p className="text-gray-500">Total Earnings</p>
            <h2 className="text-2xl font-bold text-green-600">₦12,500</h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md">
            <p className="text-gray-500">Total Pickups</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* SCHEDULE */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2 text-green-600" />
              Schedule Pickup
            </h2>

            <form onSubmit={handleSchedulePickup} className="space-y-4">
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />

              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />

              <select
                value={trashType}
                onChange={(e) => setTrashType(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select trash type</option>
                <option value="can">Can Trash</option>
                <option value="paper">Paper Trash</option>
                <option value="glass">Glass Trash</option>
                <option value="organic">Organic Trash</option>
              </select>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl flex items-center justify-center">
                <Trash2 className="mr-2" size={18} />
                Schedule Pickup
              </button>
            </form>
          </div>

          {/* PRICING */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Trash Pricing (₦ / kg)
            </h2>

            {Object.entries(trashPrices).map(([type, price]) => (
              <div
                key={type}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"
              >
                <span className="capitalize">{type} Trash</span>
                <span className="text-green-600 font-bold">
                  ₦{price}/kg
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* HISTORY SECTION */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2 text-green-600" />
            Pickup History
          </h2>

          <p className="text-gray-500">No pickups yet.</p>
        </div>

      </div>
    </div>
    </DashboardLayout>
  );
}