import api from './api';
import { Transaction } from './transactions';

export interface Reward {
  id: number;
  name: string;
  description?: string;
  points_required: number;
  reward_type: string;
  reward_value: number;
  image_url?: string;
  is_active: boolean;
  stock_quantity: number;
  created_at: string;
}

export const rewardService = {
  async getRewards(skip = 0, limit = 50, available_only = false): Promise<Reward[]> {
    const response = await api.get('/api/rewards/', {
      params: { skip, limit, available_only },
    });
    return response.data;
  },

  async getReward(id: number): Promise<Reward> {
    const response = await api.get(`/api/rewards/${id}`);
    return response.data;
  },

  async redeemReward(id: number): Promise<Transaction> {
    const response = await api.post(`/api/rewards/${id}/redeem`);
    return response.data;
  },
};
