import api from './api';

export interface Transaction {
  id: number;
  user_id: number;
  type: string;
  amount: number;
  points: number;
  description?: string;
  reference_id?: string;
  reference_type?: string;
  created_at: string;
}

export interface Balance {
  balance: number;
  points: number;
  total_waste_kg: number;
  total_co2_averted_kg: number;
}

export const transactionService = {
  async getTransactions(skip = 0, limit = 50): Promise<Transaction[]> {
    const response = await api.get('/api/transactions/', {
      params: { skip, limit },
    });
    return response.data;
  },

  async withdraw(amount: number): Promise<Transaction> {
    const response = await api.post('/api/transactions/withdraw', null, {
      params: { amount },
    });
    return response.data;
  },

  async getBalance(): Promise<Balance> {
    const response = await api.get('/api/transactions/balance');
    return response.data;
  },
};
