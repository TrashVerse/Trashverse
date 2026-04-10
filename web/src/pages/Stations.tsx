import { useEffect, useState } from 'react';
import { stationService, RecyclingStation } from '../services/stations';
import DashboardLayout from '../components/DashboardLayout';

export default function Stations() {
  const [stations, setStations] = useState<RecyclingStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchingNearest, setSearchingNearest] = useState(false);
  const [wasteTypeFilter, setWasteTypeFilter] = useState<string>('');
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState<string>('all');

  useEffect(() => {
    loadStations();
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  };

  const loadStations = async (latitude?: number, longitude?: number) => {
    try {
      const data = await stationService.getStations(latitude, longitude);
      setStations(data);
    } catch (error) {
      console.error('Failed to load stations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFindNearest = async () => {
    if (!userLocation) {
      alert('Location access required. Please enable location services.');
      return;
    }

    try {
      setSearchingNearest(true);
      const nearest = await stationService.findNearest(
        userLocation.lat,
        userLocation.lng,
        wasteTypeFilter || undefined
      );
      setStations([nearest]);
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to find nearest station');
    } finally {
      setSearchingNearest(false);
    }
  };

  const handleShowAll = () => {
    setLoading(true);
    loadStations();
  };

  // Filter stations
  const filteredStations = stations.filter((station) => {
    // Search term (name or address)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesName = station.name.toLowerCase().includes(searchLower);
      const matchesAddress = station.address.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesAddress) return false;
    }
    
    // City filter
    if (cityFilter !== 'all' && station.city !== cityFilter) return false;
    
    return true;
  });

  // Get unique cities for filter
  const cities = Array.from(new Set(stations.map(s => s.city))).sort();

  const clearFilters = () => {
    setSearchTerm('');
    setCityFilter('all');
  };

  const activeFiltersCount = 
    (searchTerm ? 1 : 0) + 
    (cityFilter !== 'all' ? 1 : 0);

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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recycling Stations</h1>
            {userLocation && (
              <p className="text-sm text-gray-600 mt-1">
                📍 Location services enabled
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShowAll}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Show All
            </button>
          </div>
        </div>

        {userLocation && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Find Nearest Station</h2>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Waste Type (Optional)
                </label>
                <select
                  value={wasteTypeFilter}
                  onChange={(e) => setWasteTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Types</option>
                  <option value="plastic">Plastic</option>
                  <option value="paper">Paper</option>
                  <option value="metal">Metal</option>
                  <option value="electronics">Electronics</option>
                  <option value="glass">Glass</option>
                  <option value="organic">Organic</option>
                  <option value="textile">Textile</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleFindNearest}
                  disabled={searchingNearest}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 whitespace-nowrap"
                >
                  {searchingNearest ? 'Searching...' : 'Find Nearest'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or address..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing {filteredStations.length} of {stations.length} stations
            </div>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Clear Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <div key={station.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{station.name}</h3>
                {station.distance_km !== undefined && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {station.distance_km.toFixed(1)} km away
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {station.address}, {station.city}
              </p>
              
              {station.phone && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Phone:</span> {station.phone}
                </p>
              )}
              
              {station.operating_hours && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Hours:</span> {station.operating_hours}
                </p>
              )}
              
              {station.accepted_waste_types && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Accepted Waste:</p>
                  <div className="flex flex-wrap gap-2">
                    {station.accepted_waste_types.split(',').map((type, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                      >
                        {type.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {stations.length === 0 ? 'No recycling stations found' : 'No stations match your filters'}
            </p>
          </div>
        )}
        </div>
      </DashboardLayout>
  );
}
