import { useEffect, useState } from 'react';
import { rewardService, Reward } from '../services/rewards';
import { transactionService } from '../services/transactions';
import DashboardLayout from '../components/DashboardLayout';

export default function Rewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [rewardsData, balanceData] = await Promise.all([
        rewardService.getRewards(),
        transactionService.getBalance(),
      ]);
      setRewards(rewardsData);
      setUserPoints(balanceData.points);
    } catch (error) {
      console.error('Failed to load rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (reward: Reward) => {
    if (userPoints < reward.points_required) {
      alert('Insufficient points');
      return;
    }

    if (reward.stock_quantity <= 0) {
      alert('Out of stock');
      return;
    }

    if (confirm(`Redeem ${reward.name} for ${reward.points_required} points?`)) {
      try {
        await rewardService.redeemReward(reward.id);
        alert('Reward redeemed successfully!');
        loadData();
      } catch (error: any) {
        alert(error.response?.data?.detail || 'Failed to redeem reward');
      }
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

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rewards Shop</h1>
          <div className="bg-purple-100 px-6 py-3 rounded-lg">
            <p className="text-sm text-purple-600">Your Points</p>
            <p className="text-2xl font-bold text-purple-700">{userPoints}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const canAfford = userPoints >= reward.points_required;
            const inStock = reward.stock_quantity > 0;

            return (
              <div key={reward.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <div className="text-white text-6xl">🎁</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{reward.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Points Required</p>
                      <p className="text-lg font-bold text-purple-600">{reward.points_required}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Value</p>
                      <p className="text-lg font-bold text-green-600">₦{reward.reward_value}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Stock: {reward.stock_quantity}</p>
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford || !inStock}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!inStock ? 'Out of Stock' : !canAfford ? 'Insufficient Points' : 'Redeem'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {rewards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No rewards available at the moment</p>
          </div>
        )}
        </div>
      </DashboardLayout>
  );
}
