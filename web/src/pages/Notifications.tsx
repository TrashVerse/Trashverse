import { useEffect, useState } from 'react';
import { notificationService, Notification } from '../services/notifications';
import DashboardLayout from '../components/DashboardLayout';

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    loadNotifications();
  }, [filter]);

  const loadNotifications = async () => {
    try {
      const data = await notificationService.getNotifications(0, 50, filter === 'unread');
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      loadNotifications();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      loadNotifications();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this notification?')) {
      try {
        await notificationService.deleteNotification(id);
        loadNotifications();
      } catch (error) {
        console.error('Failed to delete notification:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
            </select>
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Mark All Read
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  !notification.is_read ? 'border-l-4 border-green-600' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{notification.title}</h3>
                      {!notification.is_read && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{notification.body}</p>
                    <p className="text-sm text-gray-500">{formatDate(notification.created_at)}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!notification.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        </div>

      </DashboardLayout>
  );
}
