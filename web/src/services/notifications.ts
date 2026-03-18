import api from './api';

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  body: string;
  type?: string;
  is_read: boolean;
  data?: string;
  created_at: string;
}

export const notificationService = {
  async getNotifications(skip = 0, limit = 50, unread_only = false): Promise<Notification[]> {
    const response = await api.get('/api/notifications/', {
      params: { skip, limit, unread_only },
    });
    return response.data;
  },

  async getUnreadCount(): Promise<number> {
    const response = await api.get('/api/notifications/unread/count');
    return response.data.unread_count;
  },

  async markAsRead(id: number): Promise<Notification> {
    const response = await api.put(`/api/notifications/${id}/read`);
    return response.data;
  },

  async markAllAsRead(): Promise<void> {
    await api.put('/api/notifications/read-all');
  },

  async deleteNotification(id: number): Promise<void> {
    await api.delete(`/api/notifications/${id}`);
  },
};
