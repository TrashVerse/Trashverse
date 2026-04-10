import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { adminService } from '../../services/admin';

export default function AdminPickups() {
  const [pickups, setPickups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadPickups();
  }, [statusFilter]);

  const loadPickups = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllPickups(statusFilter || undefined);
      setPickups(data);
    } catch (error) {
      console.error('Failed to load pickups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (pickupId: number, newStatus: string) => {
    try {
      await adminService.updatePickupStatus(pickupId, newStatus);
      loadPickups();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to update pickup');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Pickup Management</h2>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {loading ? (
          <div className="text-center py-8">Loading pickups...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Waste Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Address</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pickups.map((pickup) => (
                  <tr key={pickup.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">#{pickup.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{pickup.user_id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 capitalize">{pickup.waste_type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{pickup.pickup_address}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(pickup.pickup_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        pickup.status === 'completed' ? 'bg-green-100 text-green-700' :
                        pickup.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        pickup.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {pickup.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={pickup.status}
                        onChange={(e) => handleUpdateStatus(pickup.id, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
