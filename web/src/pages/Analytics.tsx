import { useEffect, useState } from 'react';
import { analyticsService, UserStats } from '../services/analytics';
import DashboardLayout from '../components/DashboardLayout';
import { TrendingUp, DollarSign, Trash2, Cloud } from 'lucide-react';

export default function Analytics() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await analyticsService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
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

  if (!stats) {
    return (
      <DashboardLayout>
        <div>
          <p className="text-center text-gray-500">Failed to load analytics</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Statistics</h1>
        <p className="text-gray-600 mb-8">Detailed insights into your recycling impact</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
            <p className="text-2xl font-bold text-gray-900">
              ₦{stats.total_stats.earnings.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Trash2 className="text-blue-600" size={24} />
              </div>
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Waste</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.total_stats.waste_kg.toFixed(1)} kg
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Cloud className="text-emerald-600" size={24} />
              </div>
              <TrendingUp className="text-emerald-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 mb-1">CO₂ Averted</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.total_stats.co2_averted_kg.toFixed(1)} kg
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <TrendingUp className="text-purple-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Points</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total_stats.points}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Performance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Waste Recycled (Last 30 Days)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.monthly_stats.waste_kg.toFixed(1)} kg
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Earnings</p>
                  <p className="text-xl font-bold text-green-600">
                    ₦{stats.monthly_stats.earnings.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 mb-2">Average per Day</p>
                <p className="text-lg font-bold text-blue-700">
                  {(stats.monthly_stats.waste_kg / 30).toFixed(2)} kg/day
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 mb-2">Daily Earnings Average</p>
                <p className="text-lg font-bold text-green-700">
                  ₦{(stats.monthly_stats.earnings / 30).toFixed(2)}/day
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Waste Breakdown</h2>
            {Object.keys(stats.waste_breakdown).length === 0 ? (
              <p className="text-gray-500 text-center py-8">No waste data yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(stats.waste_breakdown).map(([type, data]: [string, any]) => (
                  <div key={type} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-gray-900 capitalize">{type}</p>
                      <p className="text-sm text-gray-600">{data.count} entries</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Weight: {data.total_weight.toFixed(1)} kg</span>
                      <span className="text-green-600 font-medium">
                        ₦{data.total_earnings.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(data.total_weight / stats.total_stats.waste_kg) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Environmental Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-4xl mb-2">🌳</p>
              <p className="text-2xl font-bold text-green-700">
                {(stats.total_stats.co2_averted_kg / 21).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Trees Equivalent</p>
              <p className="text-xs text-gray-500 mt-2">
                Based on average tree CO₂ absorption
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <p className="text-4xl mb-2">🚗</p>
              <p className="text-2xl font-bold text-blue-700">
                {(stats.total_stats.co2_averted_kg / 0.12).toFixed(0)}
              </p>
              <p className="text-sm text-gray-600">km Driving Saved</p>
              <p className="text-xs text-gray-500 mt-2">
                Average car emissions per km
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <p className="text-4xl mb-2">♻️</p>
              <p className="text-2xl font-bold text-purple-700">
                {stats.total_stats.pickups}
              </p>
              <p className="text-sm text-gray-600">Total Pickups</p>
              <p className="text-xs text-gray-500 mt-2">
                Waste collection events
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
