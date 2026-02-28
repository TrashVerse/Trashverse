import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  phone?: string;
  role: string;
  address?: string;
  city?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  total_earnings: number;
  total_pickups: number;
  total_waste_kg: number;
  total_co2_averted_kg: number;
  points: number;
  is_active: boolean;
  created_at: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ access_token: string; token_type: string }> {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await api.post('/api/auth/login', formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token } = response.data;
    await AsyncStorage.setItem('access_token', access_token);
    return response.data;
  },

  async register(data: RegisterData): Promise<User> {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  async updateProfile(data: Partial<RegisterData>): Promise<User> {
    const response = await api.put('/api/auth/me', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('access_token');
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('access_token');
  },
};
