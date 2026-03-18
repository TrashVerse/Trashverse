import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wasteService, WasteType } from '../services/waste';
import DashboardLayout from '../components/DashboardLayout';

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
  const [selectedType, setSelectedType] = useState<WasteType | null>(null);
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      const entry = await wasteService.createEntry({
        waste_type: selectedType,
        weight_kg: weightNum,
        description: description.trim() || undefined,
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
