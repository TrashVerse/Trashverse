import { useEffect, useState } from 'react';
import { transactionService, Transaction } from '../services/transactions';
import { wasteService, WasteEntryResponse } from '../services/waste';
import DashboardLayout from '../components/DashboardLayout';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wasteEntries, setWasteEntries] = useState<WasteEntryResponse[]>([]);
  const [balance, setBalance] = useState({ balance: 0, points: 0, total_waste_kg: 0, total_co2_averted_kg: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'transactions' | 'entries'>('transactions');
  const [selectedEntry, setSelectedEntry] = useState<WasteEntryResponse | null>(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [wasteTypeFilter, setWasteTypeFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [txData, balData, entriesData] = await Promise.all([
        transactionService.getTransactions(),
        transactionService.getBalance(),
        wasteService.getEntries(),
      ]);
      setTransactions(txData);
      setBalance(balData);
      setWasteEntries(entriesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (id: number) => {
    if (confirm('Are you sure you want to delete this waste entry?')) {
      try {
        await wasteService.deleteEntry(id);
        alert('Entry deleted successfully');
        loadData();
      } catch (error: any) {
        alert(error.response?.data?.detail || 'Failed to delete entry');
      }
    }
  };

  const handleViewDetails = async (id: number) => {
    try {
      const entry = await wasteService.getEntry(id);
      setSelectedEntry(entry);
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to load entry details');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    // Type filter
    if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
    
    // Search term
    if (searchTerm && !tx.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // Date range
    if (dateRange.start || dateRange.end) {
      const txDate = new Date(tx.created_at);
      if (dateRange.start && txDate < new Date(dateRange.start)) return false;
      if (dateRange.end && txDate > new Date(dateRange.end + 'T23:59:59')) return false;
    }
    
    return true;
  });

  // Filter waste entries
  const filteredWasteEntries = wasteEntries.filter((entry) => {
    // Waste type filter
    if (wasteTypeFilter !== 'all' && entry.waste_type !== wasteTypeFilter) return false;
    
    // Search term
    if (searchTerm && !entry.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // Date range
    if (dateRange.start || dateRange.end) {
      const entryDate = new Date(entry.created_at);
      if (dateRange.start && entryDate < new Date(dateRange.start)) return false;
      if (dateRange.end && entryDate > new Date(dateRange.end + 'T23:59:59')) return false;
    }
    
    return true;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setWasteTypeFilter('all');
    setDateRange({ start: '', end: '' });
  };

  const activeFiltersCount = 
    (searchTerm ? 1 : 0) + 
    (typeFilter !== 'all' ? 1 : 0) + 
    (wasteTypeFilter !== 'all' ? 1 : 0) + 
    (dateRange.start || dateRange.end ? 1 : 0);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Transactions & History</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">Balance</p>
            <p className="text-2xl font-bold text-green-600">₦{balance.balance.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">Points</p>
            <p className="text-2xl font-bold text-purple-600">{balance.points}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">Total Waste</p>
            <p className="text-2xl font-bold text-blue-600">{balance.total_waste_kg.toFixed(1)} kg</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">CO₂ Averted</p>
            <p className="text-2xl font-bold text-emerald-600">{balance.total_co2_averted_kg.toFixed(1)} kg</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-4">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 px-6 py-4 font-medium ${
                activeTab === 'transactions'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('entries')}
              className={`flex-1 px-6 py-4 font-medium ${
                activeTab === 'entries'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Waste Entries
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            {activeTab === 'transactions' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Types</option>
                  <option value="earning">Earning</option>
                  <option value="reward">Reward</option>
                  <option value="withdrawal">Withdrawal</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Waste Type</label>
                <select
                  value={wasteTypeFilter}
                  onChange={(e) => setWasteTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Types</option>
                  <option value="plastic">Plastic</option>
                  <option value="paper">Paper</option>
                  <option value="metal">Metal</option>
                  <option value="electronics">Electronics</option>
                  <option value="glass">Glass</option>
                  <option value="organic">Organic</option>
                  <option value="textile">Textile</option>
                </select>
              </div>
            )}
            
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Clear Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {activeTab === 'transactions' ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Transaction History 
                {filteredTransactions.length !== transactions.length && (
                  <span className="text-sm text-gray-500 ml-2">
                    ({filteredTransactions.length} of {transactions.length})
                  </span>
                )}
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredTransactions.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  {transactions.length === 0 ? 'No transactions yet' : 'No transactions match your filters'}
                </div>
              ) : (
                filteredTransactions.map((tx) => (
                  <div key={tx.id} className="px-6 py-4 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{tx.type}</p>
                        <p className="text-sm text-gray-600 mt-1">{tx.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(tx.created_at)}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            tx.amount >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {tx.amount >= 0 ? '+' : ''}₦{Math.abs(tx.amount).toFixed(2)}
                        </p>
                        {tx.points !== 0 && (
                          <p className="text-sm text-purple-600">
                            {tx.points > 0 ? '+' : ''}
                            {tx.points} pts
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWasteEntries.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-500">
                {wasteEntries.length === 0 ? 'No waste entries yet' : 'No entries match your filters'}
              </div>
            ) : (
              <>
                <div className="text-sm text-gray-600 mb-2">
                  Showing {filteredWasteEntries.length} of {wasteEntries.length} entries
                </div>
                {filteredWasteEntries.map((entry) => (
                  <div key={entry.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 capitalize">{entry.waste_type}</h3>
                        <p className="text-sm text-gray-600 mt-1">{formatDate(entry.created_at)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(entry.id)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Weight</p>
                        <p className="font-medium">{entry.weight_kg} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Earned</p>
                        <p className="font-medium text-green-600">₦{entry.amount_earned}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Points</p>
                        <p className="font-medium text-purple-600">{entry.points_earned}</p>
                      </div>
                    </div>
                    {entry.description && (
                      <p className="text-sm text-gray-600 mt-4 border-t pt-4">{entry.description}</p>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Entry Details</h2>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Waste Type</p>
                    <p className="font-medium capitalize">{selectedEntry.waste_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-medium">{selectedEntry.weight_kg} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount Earned</p>
                    <p className="font-medium text-green-600">₦{selectedEntry.amount_earned}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Points Earned</p>
                    <p className="font-medium text-purple-600">{selectedEntry.points_earned}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created At</p>
                    <p className="font-medium">{formatDate(selectedEntry.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Entry ID</p>
                    <p className="font-medium">#{selectedEntry.id}</p>
                  </div>
                </div>
                {selectedEntry.description && (
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="font-medium">{selectedEntry.description}</p>
                  </div>
                )}
                {selectedEntry.ai_confidence && (
                  <div>
                    <p className="text-sm text-gray-600">AI Confidence</p>
                    <p className="font-medium">{(selectedEntry.ai_confidence * 100).toFixed(1)}%</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
