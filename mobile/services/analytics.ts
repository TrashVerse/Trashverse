import api from './api';

export interface DashboardStats {
  user_stats: {
    total_earnings: number;
    total_pickups: number;
    total_waste_kg: number;
    total_co2_averted_kg: number;
    points: number;
    recent_transactions: any[];
    waste_breakdown: Record<string, any>;
  };
  upcoming_pickups: any[];
  available_rewards: any[];
}

export interface UserStats {
  total_stats: {
    earnings: number;
    pickups: number;
    waste_kg: number;
    co2_averted_kg: number;
    points: number;
  };
  monthly_stats: {
    waste_kg: number;
    earnings: number;
  };
  waste_breakdown: Record<string, any>;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  total_waste_kg: number;
  total_co2_averted_kg: number;
  points: number;
}

export const analyticsService = {
  async getDashboard(): Promise<DashboardStats> {
    const response = await api.get('/api/analytics/dashboard');
    return response.data;
  },

  async getStats(): Promise<UserStats> {
    const response = await api.get('/api/analytics/stats');
    return response.data;
  },

  async getLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
    const response = await api.get('/api/analytics/leaderboard', {
      params: { limit },
    });
    return response.data;
  },
};
