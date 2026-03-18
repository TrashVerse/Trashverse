import { useEffect, useState } from 'react';
import { pickupService, PickupResponse, PickupCreate } from '../services/pickups';
import { WasteType } from '../services/waste';
import DashboardLayout from '../components/DashboardLayout';

export default function Pickups() {
  const [pickups, setPickups] = useState<PickupResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPickup, setEditingPickup] = useState<PickupResponse | null>(null);
  const [formData, setFormData] = useState<PickupCreate>({
    pickup_address: '',
    waste_type: 'plastic',
    estimated_weight_kg: 0,
    notes: '',
  });

  useEffect(() => {
    loadPickups();
  }, []);

  const loadPickups = async () => {
    try {
      const data = await pickupService.getPickups();
      setPickups(data);
    } catch (error) {
      console.error('Failed to load pickups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPickup) {
        await pickupService.updatePickup(editingPickup.id, formData);
        alert('Pickup updated successfully!');
      } else {
        await pickupService.schedulePickup(formData);
        alert('Pickup scheduled successfully!');
      }
      setShowForm(false);
      setEditingPickup(null);
      setFormData({
        pickup_address: '',
        waste_type: 'plastic',
        estimated_weight_kg: 0,
        notes: '',
      });
      loadPickups();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to save pickup');
    }
  };

  const handleEdit = (pickup: PickupResponse) => {
    setEditingPickup(pickup);
    setFormData({
      pickup_address: pickup.pickup_address,
      waste_type: pickup.waste_type as WasteType || 'plastic',
      estimated_weight_kg: pickup.estimated_weight_kg || 0,
      notes: pickup.notes || '',
    });
    setShowForm(true);
  };

  const handleCancel = async (id: number) => {
    if (confirm('Are you sure you want to cancel this pickup?')) {
      try {
        await pickupService.cancelPickup(id);
        alert('Pickup cancelled successfully');
        loadPickups();
      } catch (error: any) {
        alert(error.response?.data?.detail || 'Failed to cancel pickup');
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPickup(null);
    setFormData({
      pickup_address: '',
      waste_type: 'plastic',
      estimated_weight_kg: 0,
      notes: '',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      scheduled: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
          <h1 className="text-3xl font-bold text-gray-900">Pickups</h1>
          <button
            onClick={() => showForm ? handleCloseForm() : setShowForm(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            {showForm ? 'Cancel' : 'Schedule Pickup'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingPickup ? 'Update Pickup' : 'Schedule New Pickup'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.pickup_address}
                  onChange={(e) => setFormData({ ...formData, pickup_address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waste Type</label>
                  <select
                    value={formData.waste_type}
                    onChange={(e) =>
                      setFormData({ ...formData, waste_type: e.target.value as WasteType })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="plastic">Plastic</option>
                    <option value="paper">Paper</option>
                    <option value="metal">Metal</option>
                    <option value="electronics">Electronics</option>
                    <option value="glass">Glass</option>
                    <option value="organic">Organic</option>
                    <option value="textile">Textile</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.estimated_weight_kg}
                    onChange={(e) =>
                      setFormData({ ...formData, estimated_weight_kg: parseFloat(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
              >
                {editingPickup ? 'Update Pickup' : 'Schedule Pickup'}
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {pickups.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">No pickups scheduled yet</p>
            </div>
          ) : (
            pickups.map((pickup) => (
              <div key={pickup.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 capitalize">
                      {pickup.waste_type} Pickup
                    </h3>
                    <p className="text-gray-600 mt-1">{pickup.pickup_address}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pickup.status)}`}>
                      {pickup.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Estimated Weight</p>
                    <p className="font-medium">{pickup.estimated_weight_kg} kg</p>
                  </div>
                  {pickup.scheduled_date && (
                    <div>
                      <p className="text-gray-500">Scheduled Date</p>
                      <p className="font-medium">
                        {new Date(pickup.scheduled_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                {pickup.notes && (
                  <p className="text-sm text-gray-600 mb-4 border-t pt-4">{pickup.notes}</p>
                )}
                {pickup.status !== 'completed' && pickup.status !== 'cancelled' && (
                  <div className="flex gap-2 border-t pt-4">
                    <button
                      onClick={() => handleEdit(pickup)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCancel(pickup.id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        </div>

      </DashboardLayout>
  );
}
