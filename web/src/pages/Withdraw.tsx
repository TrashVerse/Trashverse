import { useEffect, useState } from 'react';
import { transactionService, Balance } from '../services/transactions';
import DashboardLayout from '../components/DashboardLayout';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function Withdraw() {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {
      const data = await transactionService.getBalance();
      setBalance(data);
    } catch (error) {
      console.error('Failed to load balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawAmount = parseFloat(amount);
    
    if (!withdrawAmount || withdrawAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!balance || withdrawAmount > balance.balance) {
      alert('Insufficient balance');
      return;
    }

    if (withdrawAmount < 1000) {
      alert('Minimum withdrawal amount is ₦1,000');
      return;
    }

    if (confirm(`Withdraw ₦${withdrawAmount.toFixed(2)} from your account?`)) {
      try {
        setWithdrawing(true);
        await transactionService.withdraw(withdrawAmount);
        alert('Withdrawal successful! Funds will be processed within 24 hours.');
        setAmount('');
        loadBalance();
      } catch (error: any) {
        alert(error.response?.data?.detail || 'Failed to process withdrawal');
      } finally {
        setWithdrawing(false);
      }
    }
  };

  const setQuickAmount = (value: number) => {
    if (balance && value <= balance.balance) {
      setAmount(value.toString());
    }
  };

  const setMaxAmount = () => {
    if (balance) {
      setAmount(balance.balance.toString());
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

  if (!balance) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Failed to load balance</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Withdraw Earnings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Available Balance</p>
              <DollarSign className="text-green-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-green-600">₦{balance.balance.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Points</p>
              <TrendingUp className="text-purple-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-purple-600">{balance.points}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Waste</p>
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-blue-600">{balance.total_waste_kg.toFixed(1)} kg</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Withdrawal</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Withdrawal Information:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Minimum withdrawal amount: ₦1,000</li>
                <li>Processing time: 24-48 hours</li>
                <li>Funds will be transferred to your registered bank account</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleWithdraw} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Amount (₦)
              </label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Select:</p>
              <div className="grid grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setQuickAmount(1000)}
                  disabled={balance.balance < 1000}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ₦1,000
                </button>
                <button
                  type="button"
                  onClick={() => setQuickAmount(5000)}
                  disabled={balance.balance < 5000}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ₦5,000
                </button>
                <button
                  type="button"
                  onClick={() => setQuickAmount(10000)}
                  disabled={balance.balance < 10000}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ₦10,000
                </button>
                <button
                  type="button"
                  onClick={setMaxAmount}
                  disabled={balance.balance < 1000}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Max
                </button>
              </div>
            </div>

            {amount && parseFloat(amount) > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Withdrawal Amount:</span>
                  <span className="font-bold text-gray-900">₦{parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Remaining Balance:</span>
                  <span className="font-bold text-green-600">
                    ₦{(balance.balance - parseFloat(amount)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={withdrawing || !amount || parseFloat(amount) < 1000 || parseFloat(amount) > balance.balance}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {withdrawing ? 'Processing...' : 'Withdraw Funds'}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-3">Important Notes:</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• Ensure your bank account details are up to date in your profile</li>
            <li>• Withdrawals are processed on business days only</li>
            <li>• You will receive an email confirmation once the withdrawal is processed</li>
            <li>• Contact support if you don't receive funds within 48 hours</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
