import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { adminService } from '../../services/admin';

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    loadTransactions();
  }, [typeFilter]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllTransactions(typeFilter || undefined);
      setTransactions(data);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (transactionId: number) => {
    try {
      await adminService.approveWithdrawal(transactionId);
      loadTransactions();
      alert('Withdrawal approved successfully');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to approve withdrawal');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Transaction Management</h2>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Types</option>
          <option value="earning">Earnings</option>
          <option value="withdrawal">Withdrawals</option>
          <option value="reward">Rewards</option>
        </select>

        {loading ? (
          <div className="text-center py-8">Loading transactions...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">#{tx.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{tx.user_id}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                        tx.type === 'earning' ? 'bg-green-100 text-green-700' :
                        tx.type === 'withdrawal' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">₦{tx.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{tx.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {tx.type === 'withdrawal' && !tx.description.includes('APPROVED') && (
                        <button
                          onClick={() => handleApprove(tx.id)}
                          className="text-sm text-green-600 hover:text-green-800"
                        >
                          Approve
                        </button>
                      )}
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
