import { useState, useEffect } from 'react';
import { TrendingUp, Users as UsersIcon, Calendar, Trash2, DollarSign } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { adminService } from '../services/admin';

export default function Admin() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await adminService.getPlatformAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">Loading analytics...</div>
      </AdminLayout>
    );
  }

  if (!analytics) {
    return (
      <AdminLayout>
        <div className="text-center py-8 text-red-600">Failed to load analytics</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-blue-600 font-medium">Total Users</p>
              <UsersIcon className="text-blue-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-blue-900">{analytics.users.total}</p>
            <p className="text-xs text-blue-600 mt-1">
              {analytics.users.new_last_30_days} new in last 30 days
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-green-600 font-medium">Active Users</p>
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-green-900">{analytics.users.active}</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-purple-600 font-medium">Total Waste</p>
              <Trash2 className="text-purple-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-purple-900">{analytics.waste.total_kg.toFixed(1)} kg</p>
            <p className="text-xs text-purple-600 mt-1">
              ₦{analytics.waste.total_value.toFixed(2)} value
            </p>
          </div>
        </div>

        {/* Pickup & Transaction Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-orange-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-orange-600 font-medium">Pickups</p>
              <Calendar className="text-orange-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-orange-900">{analytics.pickups.total}</p>
            <p className="text-xs text-orange-600 mt-1">
              {analytics.pickups.completion_rate.toFixed(1)}% completion rate
            </p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-emerald-600 font-medium">Platform Revenue</p>
              <DollarSign className="text-emerald-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-emerald-900">
              ₦{analytics.transactions.platform_revenue.toFixed(2)}
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              ₦{analytics.transactions.total_earnings.toFixed(2)} total earnings
            </p>
          </div>
        </div>

        {/* Waste by Type */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Waste by Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {analytics.waste.by_type.map((item: any) => (
              <div key={item.type} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                <p className="text-xl font-bold text-gray-900">{item.kg.toFixed(1)} kg</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Users */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Contributors</h3>
          <div className="space-y-2">
            {analytics.top_users.map((user: any, index: number) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900">{user.username}</p>
                    <p className="text-sm text-gray-600">{user.total_waste_kg.toFixed(1)} kg recycled</p>
                  </div>
                </div>
                <p className="font-bold text-green-600">₦{user.total_earnings.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-lg text-white">
          <h3 className="text-lg font-bold mb-2">Environmental Impact</h3>
          <p className="text-3xl font-bold">{analytics.environmental_impact.total_co2_averted_kg.toFixed(1)} kg</p>
          <p className="text-sm opacity-90">CO₂ emissions averted</p>
        </div>
      </div>
    </AdminLayout>
  );
}
