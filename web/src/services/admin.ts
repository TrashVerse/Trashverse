import api from './api';

// ============= USER MANAGEMENT =============

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  city: string;
  total_earnings: number;
  total_pickups: number;
  total_waste_kg: number;
  created_at: string;
}

export const adminService = {
  // Users
  async getUsers(params?: { search?: string; city?: string; role?: string }) {
    const response = await api.get('/api/admin/users', { params });
    return response.data;
  },

  async getUserDetails(userId: number) {
    const response = await api.get(`/api/admin/users/${userId}`);
    return response.data;
  },

  async toggleUserActive(userId: number) {
    const response = await api.put(`/api/admin/users/${userId}/toggle-active`, {});
    return response.data;
  },

  async updateUserRole(userId: number, role: string) {
    const response = await api.put(`/api/admin/users/${userId}/role`, null, {
      params: { role }
    });
    return response.data;
  },

  // Pickups
  async getAllPickups(statusFilter?: string) {
    const response = await api.get('/api/admin/pickups', {
      params: { status_filter: statusFilter }
    });
    return response.data;
  },

  async updatePickupStatus(pickupId: number, newStatus: string) {
    const response = await api.put(`/api/admin/pickups/${pickupId}/status`, null, {
      params: { new_status: newStatus }
    });
    return response.data;
  },

  // Waste Entries
  async getAllWasteEntries(wasteType?: string) {
    const response = await api.get('/api/admin/waste-entries', {
      params: { waste_type: wasteType }
    });
    return response.data;
  },

  async updateWasteEntry(entryId: number, data: { weight_kg?: number; value?: number }) {
    const response = await api.put(`/api/admin/waste-entries/${entryId}`, null, {
      params: data
    });
    return response.data;
  },

  async deleteWasteEntry(entryId: number) {
    const response = await api.delete(`/api/admin/waste-entries/${entryId}`);
    return response.data;
  },

  // Transactions
  async getAllTransactions(transactionType?: string) {
    const response = await api.get('/api/admin/transactions', {
      params: { transaction_type: transactionType }
    });
    return response.data;
  },

  async approveWithdrawal(transactionId: number) {
    const response = await api.put(`/api/admin/transactions/${transactionId}/approve`, {});
    return response.data;
  },

  // Stations
  async getAllStations() {
    const response = await api.get('/api/admin/stations');
    return response.data;
  },

  async updateStation(stationId: number, data: any) {
    const response = await api.put(`/api/admin/stations/${stationId}`, data);
    return response.data;
  },

  async deleteStation(stationId: number) {
    const response = await api.delete(`/api/admin/stations/${stationId}`);
    return response.data;
  },

  // Rewards
  async getAllRewards() {
    const response = await api.get('/api/admin/rewards');
    return response.data;
  },

  async updateReward(rewardId: number, data: any) {
    const response = await api.put(`/api/admin/rewards/${rewardId}`, data);
    return response.data;
  },

  async deleteReward(rewardId: number) {
    const response = await api.delete(`/api/admin/rewards/${rewardId}`);
    return response.data;
  },

  // Analytics
  async getPlatformAnalytics() {
    const response = await api.get('/api/admin/analytics/overview');
    return response.data;
  },

  // Notifications
  async sendBroadcastNotification(title: string, message: string) {
    const response = await api.post('/api/admin/notifications/broadcast', null, {
      params: { title, message }
    });
    return response.data;
  },

  // Settings
  async getSystemSettings() {
    const response = await api.get('/api/admin/settings');
    return response.data;
  },

  async updateSystemSettings(settings: {
    waste_pricing?: { [key: string]: number };
    platform_commission?: number;
    minimum_withdrawal?: number;
    points_per_kg?: number;
  }) {
    const response = await api.put('/api/admin/settings', null, {
      params: settings
    });
    return response.data;
  }
};
