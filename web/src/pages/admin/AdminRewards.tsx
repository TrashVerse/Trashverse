import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { adminService } from '../../services/admin';
import { rewardService, RewardCreate } from '../../services/rewards';

export default function AdminRewards() {
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rewardForm, setRewardForm] = useState<RewardCreate>({
    name: '',
    description: '',
    points_required: 0,
    reward_type: 'discount',
    reward_value: 0,
    stock_quantity: 0,
    image_url: '',
  });

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllRewards();
      setRewards(data);
    } catch (error) {
      console.error('Failed to load rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (rewardId: number) => {
    if (!confirm('Are you sure you want to delete this reward?')) return;
    
    try {
      await adminService.deleteReward(rewardId);
      loadRewards();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to delete reward');
    }
  };

  const handleCreateReward = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await rewardService.createReward(rewardForm);
      alert('Reward created successfully!');
      setRewardForm({
        name: '',
        description: '',
        points_required: 0,
        reward_type: 'discount',
        reward_value: 0,
        stock_quantity: 0,
        image_url: '',
      });
      setShowForm(false);
      loadRewards();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to create reward');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Reward Management</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {showForm ? 'Cancel' : 'Add Reward'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Reward</h3>
            <form onSubmit={handleCreateReward} className="space-y-4">
              <input
                type="text"
                placeholder="Reward Name"
                value={rewardForm.name}
                onChange={(e) => setRewardForm({ ...rewardForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={rewardForm.description}
                onChange={(e) => setRewardForm({ ...rewardForm, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={rewardForm.reward_type}
                  onChange={(e) => setRewardForm({ ...rewardForm, reward_type: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="discount">Discount</option>
                  <option value="voucher">Voucher</option>
                  <option value="product">Product</option>
                  <option value="cash">Cash</option>
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Reward Value (₦)"
                  value={rewardForm.reward_value}
                  onChange={(e) => setRewardForm({ ...rewardForm, reward_value: parseFloat(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Points Required"
                  value={rewardForm.points_required}
                  onChange={(e) => setRewardForm({ ...rewardForm, points_required: parseInt(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={rewardForm.stock_quantity}
                  onChange={(e) => setRewardForm({ ...rewardForm, stock_quantity: parseInt(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <input
                type="url"
                placeholder="Image URL"
                value={rewardForm.image_url}
                onChange={(e) => setRewardForm({ ...rewardForm, image_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Create Reward
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Loading rewards...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900">{reward.name}</h3>
                  <button
                    onClick={() => handleDelete(reward.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Points:</span>
                    <span className="font-medium">{reward.points_required}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Value:</span>
                    <span className="font-medium">₦{reward.reward_value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock:</span>
                    <span className="font-medium">{reward.stock_quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">{reward.reward_type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
