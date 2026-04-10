import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { wasteService, WasteType } from '../services/waste';
import { uploadService } from '../services/upload';
import DashboardLayout from '../components/DashboardLayout';
import { Camera, Upload, X, MapPin } from 'lucide-react';

const wasteTypes: { type: WasteType; label: string; color: string }[] = [
  { type: 'plastic', label: 'Plastic', color: '#3B82F6' },
  { type: 'paper', label: 'Paper', color: '#F59E0B' },
  { type: 'metal', label: 'Metal', color: '#6B7280' },
  { type: 'electronics', label: 'Electronics', color: '#8B5CF6' },
  { type: 'glass', label: 'Glass', color: '#10B981' },
  { type: 'organic', label: 'Organic', color: '#84CC16' },
  { type: 'textile', label: 'Textile', color: '#EC4899' },
];

export default function WasteEntry() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<WasteType | null>(null);
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;

    try {
      setUploading(true);
      const result = await uploadService.uploadWasteImage(imageFile);
      setUploadedImageUrl(result.file_url);
      alert('Image uploaded successfully!');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleGetLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Failed to get location. Please enable location services.');
        setLocationLoading(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) {
      alert('Please select a waste type');
      return;
    }

    const weightNum = parseFloat(weight);
    if (!weightNum || weightNum <= 0) {
      alert('Please enter a valid weight');
      return;
    }

    // Upload image if selected but not uploaded yet
    if (imageFile && !uploadedImageUrl) {
      await handleUploadImage();
    }

    try {
      setLoading(true);
      const entry = await wasteService.createEntry({
        waste_type: selectedType,
        weight_kg: weightNum,
        description: description.trim() || undefined,
        image_url: uploadedImageUrl || undefined,
        latitude: location?.latitude,
        longitude: location?.longitude,
      });

      alert(`Success! You earned ₦${entry.amount_earned} and ${entry.points_earned} points!`);
      navigate('/transactions');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to create entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit Waste Entry</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Waste Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wasteTypes.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setSelectedType(item.type)}
                  className={`p-4 rounded-lg border-2 transition ${
                    selectedType === item.type
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: item.color + '20' }}
                  />
                  <p className="text-sm font-medium text-center">{item.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter weight in kg"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waste Image (Optional)
            </label>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center">
                  <Camera className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 mb-4">Upload a photo of your waste</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <Upload size={20} />
                      Choose File
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-3">Max file size: 5MB</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Waste preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                >
                  <X size={20} />
                </button>
                {!uploadedImageUrl && (
                  <button
                    type="button"
                    onClick={handleUploadImage}
                    disabled={uploading}
                    className="absolute bottom-2 right-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                )}
                {uploadedImageUrl && (
                  <div className="absolute bottom-2 right-2 px-4 py-2 bg-green-600 text-white rounded-lg">
                    ✓ Uploaded
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
              placeholder="e.g., Plastic bottles"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location (Optional)
            </label>
            {!location ? (
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={locationLoading}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition flex items-center justify-center gap-2 text-gray-600 hover:text-green-600 disabled:opacity-50"
              >
                <MapPin size={20} />
                {locationLoading ? 'Getting location...' : 'Add Location'}
              </button>
            ) : (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <MapPin size={20} />
                  <span className="text-sm">
                    Location captured: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLocation(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !selectedType || !weight}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Entry'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
