import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, Trash2, LogOut } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { BASE_URL, getAuthHeader } from "../utils/api"; // Make sure this exists

export default function Dashboard() {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [trashType, setTrashType] = useState("");
  const [userHistory, setUserHistory] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalPickups, setTotalPickups] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const trashPrices = {
    can: 500,
    paper: 300,
    glass: 200,
    organic: 100,
  };

  // Fetch dashboard data from backend
  useEffect(() => {
  async function fetchDashboard() {
    try {
      const res = await fetch(`${BASE_URL}/api/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch dashboard data: ${res.status}`);
      }

      const data = await res.json();

      // Expected backend response: { history: [...], totalEarnings: 12500, totalPickups: 3 }
      setUserHistory(data.history || []);
      setTotalEarnings(data.totalEarnings || 0);
      setTotalPickups(data.totalPickups || 0);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  fetchDashboard();
  }, []);

const handleSchedulePickup = async (e) => {
  e.preventDefault();

  try {
const res = await fetch(`${BASE_URL}/api/pickup`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...getAuthHeader(),
  },
  body: JSON.stringify({ date: pickupDate, time: pickupTime, type: trashType }),
});

    if (!res.ok) {
      throw new Error(`Failed to schedule pickup: ${res.status}`);
    }

    const newPickup = await res.json();
    setUserHistory((prev) => [newPickup, ...prev]);
    setTotalPickups((prev) => prev + 1);
    setTotalEarnings((prev) => prev + (trashPrices[trashType] || 0));

    alert("Pickup scheduled successfully!");
    setPickupDate("");
    setPickupTime("");
    setTrashType("");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
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
              <h2 className="text-2xl font-bold text-green-600">₦{totalEarnings}</h2>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <p className="text-gray-500">Total Pickups</p>
              <h2 className="text-2xl font-bold">{totalPickups}</h2>
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

            {userHistory.length === 0 ? (
              <p className="text-gray-500">No pickups yet.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm border-b">
                    <th className="py-2">Date</th>
                    <th>Type</th>
                    <th>Kg</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userHistory.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2">{item.date}</td>
                      <td>{item.type}</td>
                      <td>{item.kg}</td>
                      <td>₦{item.amount}</td>
                      <td>
                        <span className={item.status === "Completed" ? "text-green-600" : "text-yellow-500"}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}