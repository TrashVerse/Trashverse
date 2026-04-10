import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { adminService } from '../../services/admin';
import { stationService, StationCreate } from '../../services/stations';

export default function AdminStations() {
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [stationForm, setStationForm] = useState<StationCreate>({
    name: '',
    address: '',
    city: '',
    latitude: 0,
    longitude: 0,
    phone: '',
    email: '',
    accepted_waste_types: '',
    operating_hours: '',
  });

  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllStations();
      setStations(data);
    } catch (error) {
      console.error('Failed to load stations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (stationId: number) => {
    if (!confirm('Are you sure you want to delete this station?')) return;
    
    try {
      await adminService.deleteStation(stationId);
      loadStations();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to delete station');
    }
  };

  const handleCreateStation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await stationService.createStation(stationForm);
      alert('Station created successfully!');
      setStationForm({
        name: '',
        address: '',
        city: '',
        latitude: 0,
        longitude: 0,
        phone: '',
        email: '',
        accepted_waste_types: '',
        operating_hours: '',
      });
      setShowForm(false);
      loadStations();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to create station');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Station Management</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {showForm ? 'Cancel' : 'Add Station'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Station</h3>
            <form onSubmit={handleCreateStation} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Station Name"
                  value={stationForm.name}
                  onChange={(e) => setStationForm({ ...stationForm, name: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={stationForm.city}
                  onChange={(e) => setStationForm({ ...stationForm, city: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                value={stationForm.address}
                onChange={(e) => setStationForm({ ...stationForm, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude"
                  value={stationForm.latitude}
                  onChange={(e) => setStationForm({ ...stationForm, latitude: parseFloat(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="number"
                  step="any"
                  placeholder="Longitude"
                  value={stationForm.longitude}
                  onChange={(e) => setStationForm({ ...stationForm, longitude: parseFloat(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone"
                  value={stationForm.phone}
                  onChange={(e) => setStationForm({ ...stationForm, phone: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={stationForm.email}
                  onChange={(e) => setStationForm({ ...stationForm, email: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <input
                type="text"
                placeholder="Accepted Waste Types (comma-separated)"
                value={stationForm.accepted_waste_types}
                onChange={(e) => setStationForm({ ...stationForm, accepted_waste_types: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Operating Hours"
                value={stationForm.operating_hours}
                onChange={(e) => setStationForm({ ...stationForm, operating_hours: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Create Station
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Loading stations...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stations.map((station) => (
              <div key={station.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{station.name}</h3>
                    <p className="text-sm text-gray-600">{station.city}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(station.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{station.address}</p>
                <div className="flex gap-2 text-xs text-gray-500">
                  <span>{station.phone}</span>
                  <span>•</span>
                  <span>{station.email}</span>
                </div>
                {station.operating_hours && (
                  <p className="text-xs text-gray-500 mt-2">{station.operating_hours}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
