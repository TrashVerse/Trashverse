import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Trash2, DollarSign, TrendingUp } from "lucide-react";
import { analyticsService, DashboardStats } from "../services/analytics";
import DashboardLayout from "../components/DashboardLayout";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await analyticsService.getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!dashboard) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Failed to load dashboard</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Earnings</p>
              <DollarSign className="text-green-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ₦{dashboard.user_stats.total_earnings.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Pickups</p>
              <Calendar className="text-blue-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{dashboard.user_stats.total_pickups}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Waste Recycled</p>
              <Trash2 className="text-purple-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {dashboard.user_stats.total_waste_kg.toFixed(1)} kg
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Points</p>
              <TrendingUp className="text-orange-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{dashboard.user_stats.points}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/waste-entry"
                className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition text-center font-medium"
              >
                Submit Waste
              </Link>
              <Link
                to="/pickups"
                className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition text-center font-medium"
              >
                Pickups
              </Link>
              <Link
                to="/rewards"
                className="block w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition text-center font-medium"
              >
                Rewards
              </Link>
              <Link
                to="/stations"
                className="block w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition text-center font-medium"
              >
                Stations
              </Link>
              <Link
                to="/notifications"
                className="block w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition text-center font-medium"
              >
                Notifications
              </Link>
              <Link
                to="/leaderboard"
                className="block w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition text-center font-medium"
              >
                Leaderboard
              </Link>
              <Link
                to="/analytics"
                className="block w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition text-center font-medium"
              >
                Analytics
              </Link>
              <Link
                to="/profile"
                className="block w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition text-center font-medium"
              >
                Profile
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
            {dashboard.user_stats.recent_transactions.length === 0 ? (
              <p className="text-gray-600">No recent transactions</p>
            ) : (
              <div className="space-y-3">
                {dashboard.user_stats.recent_transactions.slice(0, 5).map((tx: any) => (
                  <div key={tx.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{tx.type}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="font-bold text-green-600">₦{tx.amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {dashboard.upcoming_pickups.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Pickups</h2>
            <div className="space-y-3">
              {dashboard.upcoming_pickups.map((pickup: any) => (
                <div key={pickup.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{pickup.waste_type}</p>
                    <p className="text-sm text-gray-600">{pickup.pickup_address}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {pickup.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
    </DashboardLayout>
  );
}
