import { useEffect, useState, useRef } from 'react';
import { authService, UserResponse } from '../services/auth';
import { uploadService } from '../services/upload';
import DashboardLayout from '../components/DashboardLayout';

export default function Profile() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await authService.getCurrentUser();
      setUser(data);
      setFormData({
        full_name: data.full_name || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        postal_code: data.postal_code || '',
      });
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }

    try {
      setUploading(true);
      const result = await uploadService.uploadProfileImage(file);
      setProfileImage(result.file_url);
      alert('Profile image uploaded successfully!');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.updateProfile(formData);
      alert('Profile updated successfully!');
      setEditing(false);
      loadUser();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to update profile');
    }
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

  if (!user) {
    return (
      <DashboardLayout>
        <div>
          <p className="text-center text-gray-500">Failed to load profile</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl text-green-600">
                        {user.full_name?.charAt(0) || user.username.charAt(0)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-4 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition disabled:opacity-50"
                    title="Upload profile picture"
                  >
                    {uploading ? '...' : '📷'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.full_name || user.username}</h2>
                <p className="text-gray-600">@{user.username}</p>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-green-600">₦{user.total_earnings.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Points</p>
                  <p className="text-2xl font-bold text-purple-600">{user.points}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Pickups</p>
                  <p className="text-xl font-bold text-gray-900">{user.total_pickups}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Waste Recycled</p>
                  <p className="text-xl font-bold text-gray-900">{user.total_waste_kg.toFixed(1)} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CO₂ Averted</p>
                  <p className="text-xl font-bold text-emerald-600">{user.total_co2_averted_kg.toFixed(1)} kg</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                >
                  {editing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {editing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        value={formData.postal_code}
                        onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">{user.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-gray-900">{user.address || 'Not set'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">City</p>
                      <p className="text-gray-900">{user.city || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Postal Code</p>
                      <p className="text-gray-900">{user.postal_code || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
