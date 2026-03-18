// pages/dashboard.js
import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Trash2, DollarSign, LogOut } from "lucide-react";

export default function Dashboard() {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [trashType, setTrashType] = useState("");

  const trashPrices = {
    can: 0.5,
    paper: 0.3,
    glass: 0.2,
    organic: 0.1,
  };

  const handleSchedulePickup = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert(`Pickup scheduled for ${pickupDate} at ${pickupTime} for ${trashType} trash`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-x py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="TrashVerse Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-green-600">TrashVerse Dashboard</h1>
          </div>
          <Link href="/login" className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </header>

      <div className="container-x py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schedule Pickup Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="mr-2 text-green-600" />
              Schedule Trash Pickup
            </h2>
            <form onSubmit={handleSchedulePickup} className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="trashType" className="block text-sm font-medium text-gray-700 mb-1">
                  Trash Type
                </label>
                <select
                  id="trashType"
                  value={trashType}
                  onChange={(e) => setTrashType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select trash type</option>
                  <option value="can">Can Trash</option>
                  <option value="paper">Paper Trash</option>
                  <option value="glass">Glass Trash</option>
                  <option value="organic">Organic Trash</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 flex items-center justify-center"
              >
                <Trash2 className="mr-2" size={18} />
                Schedule Pickup
              </button>
            </form>
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <DollarSign className="mr-2 text-green-600" />
              Trash Pricing per Kilo
            </h2>
            <div className="space-y-4">
              {Object.entries(trashPrices).map(([type, price]) => (
                <div key={type} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span className="font-medium text-gray-700 capitalize">{type} Trash</span>
                  <span className="text-green-600 font-bold">${price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Prices are subject to change. Contact us for bulk pickup rates.
            </p>
          </div>
        </div>

        {/* Upcoming Pickups Section (Placeholder) */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="mr-2 text-green-600" />
            Upcoming Pickups
          </h2>
          <p className="text-gray-600">No upcoming pickups scheduled.</p>
          {/* In a real app, this would display a list of scheduled pickups */}
        </div>
      </div>
    </div>
  );
}