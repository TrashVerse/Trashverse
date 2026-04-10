import { useState, useEffect } from 'react';
import { DollarSign, Percent, TrendingUp, Settings as SettingsIcon, Save, Edit2, X } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { adminService } from '../../services/admin';

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Editable state
  const [editableSettings, setEditableSettings] = useState<any>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await adminService.getSystemSettings();
      setSettings(data);
      setEditableSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setEditableSettings({ ...settings });
  };

  const handleCancel = () => {
    setEditing(false);
    setEditableSettings({ ...settings });
    setError('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      await adminService.updateSystemSettings(editableSettings);
      setSettings(editableSettings);
      setEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const updateWastePrice = (type: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setEditableSettings({
      ...editableSettings,
      waste_pricing: {
        ...editableSettings.waste_pricing,
        [type]: numValue
      }
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">Loading settings...</div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return (
      <AdminLayout>
        <div className="text-center py-8 text-red-600">Failed to load settings</div>
      </AdminLayout>
    );
  }

  const displaySettings = editing ? editableSettings : settings;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
          <div className="flex gap-2">
            {!editing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit2 size={18} />
                Edit Settings
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            ✅ Settings updated successfully!
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Waste Pricing */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <DollarSign className="text-green-600 mr-2" size={24} />
            <h3 className="text-lg font-bold text-gray-900">Waste Pricing (₦ per kg)</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(displaySettings.waste_pricing).map(([type, price]) => (
              <div key={type} className={`p-4 rounded-lg ${editing ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
                <p className="text-sm text-gray-600 capitalize mb-2">{type}</p>
                {editing ? (
                  <input
                    type="number"
                    value={price as number}
                    onChange={(e) => updateWastePrice(type, e.target.value)}
                    className="w-full text-2xl font-bold text-gray-900 border border-gray-300 rounded px-2 py-1"
                    min="0"
                    step="1"
                  />
                ) : (
                  <p className="text-2xl font-bold text-gray-900">₦{String(price)}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Platform Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <SettingsIcon className="text-blue-600 mr-2" size={24} />
            <h3 className="text-lg font-bold text-gray-900">Platform Configuration</h3>
          </div>
          <div className="space-y-4">
            {/* Platform Commission */}
            <div className={`flex items-center justify-between p-4 rounded-lg ${editing ? 'bg-blue-50 border-2 border-blue-200' : 'bg-blue-50'}`}>
              <div className="flex items-center">
                <Percent className="text-blue-600 mr-3" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Platform Commission</p>
                  <p className="text-sm text-gray-600">Fee charged on transactions</p>
                </div>
              </div>
              {editing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={displaySettings.platform_commission}
                    onChange={(e) => setEditableSettings({
                      ...editableSettings,
                      platform_commission: parseFloat(e.target.value) || 0
                    })}
                    className="w-20 text-2xl font-bold text-blue-600 border border-gray-300 rounded px-2 py-1"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span className="text-2xl font-bold text-blue-600">%</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-blue-600">{displaySettings.platform_commission}%</p>
              )}
            </div>

            {/* Minimum Withdrawal */}
            <div className={`flex items-center justify-between p-4 rounded-lg ${editing ? 'bg-blue-50 border-2 border-blue-200' : 'bg-green-50'}`}>
              <div className="flex items-center">
                <DollarSign className="text-green-600 mr-3" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Minimum Withdrawal</p>
                  <p className="text-sm text-gray-600">Minimum amount users can withdraw</p>
                </div>
              </div>
              {editing ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">₦</span>
                  <input
                    type="number"
                    value={displaySettings.minimum_withdrawal}
                    onChange={(e) => setEditableSettings({
                      ...editableSettings,
                      minimum_withdrawal: parseFloat(e.target.value) || 0
                    })}
                    className="w-28 text-2xl font-bold text-green-600 border border-gray-300 rounded px-2 py-1"
                    min="0"
                    step="100"
                  />
                </div>
              ) : (
                <p className="text-2xl font-bold text-green-600">₦{displaySettings.minimum_withdrawal}</p>
              )}
            </div>

            {/* Points Per Kilogram */}
            <div className={`flex items-center justify-between p-4 rounded-lg ${editing ? 'bg-blue-50 border-2 border-blue-200' : 'bg-purple-50'}`}>
              <div className="flex items-center">
                <TrendingUp className="text-purple-600 mr-3" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Points Per Kilogram</p>
                  <p className="text-sm text-gray-600">Reward points earned per kg recycled</p>
                </div>
              </div>
              {editing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={displaySettings.points_per_kg}
                    onChange={(e) => setEditableSettings({
                      ...editableSettings,
                      points_per_kg: parseInt(e.target.value) || 0
                    })}
                    className="w-20 text-2xl font-bold text-purple-600 border border-gray-300 rounded px-2 py-1"
                    min="0"
                    step="1"
                  />
                  <span className="text-2xl font-bold text-purple-600">pts</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-purple-600">{displaySettings.points_per_kg} pts</p>
              )}
            </div>
          </div>
        </div>

        {/* Info Notice */}
        {!editing && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Click "Edit Settings" to modify system configuration. 
              Changes will take effect immediately across the platform.
            </p>
          </div>
        )}

        {editing && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> Changing these settings will affect all users and transactions. 
              Make sure you understand the impact before saving.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
