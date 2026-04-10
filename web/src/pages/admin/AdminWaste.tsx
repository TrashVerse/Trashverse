import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { adminService } from '../../services/admin';

export default function AdminWaste() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editWeight, setEditWeight] = useState('');
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    console.log('AdminWaste component mounted');
    loadEntries();
  }, [typeFilter]);

  const loadEntries = async () => {
    console.log('Loading waste entries...');
    try {
      setLoading(true);
      setError('');
      const data = await adminService.getAllWasteEntries(typeFilter || undefined);
      console.log('Loaded entries:', data);
      setEntries(data);
    } catch (error: any) {
      console.error('Failed to load waste entries:', error);
      setError(error.response?.data?.detail || error.message || 'Failed to load waste entries');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry: any) => {
    setEditingId(entry.id);
    setEditWeight((entry.weight_kg || 0).toString());
    setEditValue((entry.value || 0).toString());
  };

  const handleSaveEdit = async (entryId: number) => {
    try {
      await adminService.updateWasteEntry(entryId, {
        weight_kg: parseFloat(editWeight),
        value: parseFloat(editValue)
      });
      setEditingId(null);
      loadEntries();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to update entry');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditWeight('');
    setEditValue('');
  };

  const handleDelete = async (entryId: number) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      await adminService.deleteWasteEntry(entryId);
      loadEntries();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to delete entry');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Waste Entry Management</h2>
          <button
            onClick={loadEntries}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Refresh
          </button>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Types</option>
            <option value="plastic">Plastic</option>
            <option value="paper">Paper</option>
            <option value="metal">Metal</option>
            <option value="glass">Glass</option>
            <option value="organic">Organic</option>
          </select>

          <div className="text-sm text-gray-600">
            Total: {entries.length} entries
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Loading entries...</div>
        ) : entries.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600">No waste entries found.</p>
            {typeFilter && (
              <p className="text-sm text-gray-500 mt-2">
                Try changing the filter or select "All Types"
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Weight (kg)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Value (₦)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">#{entry.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {entry.user?.username || `User #${entry.user_id}`}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 capitalize">{entry.waste_type}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {editingId === entry.id ? (
                        <input
                          type="number"
                          value={editWeight}
                          onChange={(e) => setEditWeight(e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded"
                          step="0.1"
                          min="0"
                        />
                      ) : (
                        `${entry.weight_kg || 0} kg`
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 font-medium">
                      {editingId === entry.id ? (
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded"
                          step="0.01"
                          min="0"
                        />
                      ) : (
                        `₦${(entry.value || 0).toFixed(2)}`
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {editingId === entry.id ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(entry.id)}
                              className="text-sm text-green-600 hover:text-green-800"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-sm text-gray-600 hover:text-gray-800"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(entry)}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="text-sm text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
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
