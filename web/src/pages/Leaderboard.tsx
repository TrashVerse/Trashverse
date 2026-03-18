import { useEffect, useState } from 'react';
import { analyticsService, LeaderboardEntry } from '../services/analytics';
import DashboardLayout from '../components/DashboardLayout';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await analyticsService.getLeaderboard(20);
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
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

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Leaderboard</h1>
        <p className="text-gray-600 mb-8 text-center">Top recyclers making a difference</p>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Waste Recycled</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">CO₂ Averted</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.rank}
                    className={`hover:bg-gray-50 transition ${
                      entry.rank <= 3 ? 'bg-green-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-2xl">{getMedalEmoji(entry.rank)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{entry.username}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-medium text-gray-900">{entry.total_waste_kg.toFixed(1)} kg</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-medium text-emerald-600">{entry.total_co2_averted_kg.toFixed(1)} kg</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-medium text-purple-600">{entry.points}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {leaderboard.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No data available yet</p>
            </div>
          )}
        </div>
        </div>

      </DashboardLayout>
  );
}
