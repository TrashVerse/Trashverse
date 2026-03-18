import api from './api';

export interface UserCreate {
  email: string;
  username: string;
  password: string;
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
}

export interface UserResponse {
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

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export const authService = {
  async register(data: UserCreate): Promise<UserResponse> {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<Token> {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await api.post('/api/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  },

  async getCurrentUser(): Promise<UserResponse> {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  async updateProfile(data: Partial<UserCreate>): Promise<UserResponse> {
    const response = await api.put('/api/auth/me', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  },
};
