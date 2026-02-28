# TrashVerse Frontend Integration Guide

## Overview

This guide shows how to integrate the TrashVerse React Native frontend with the FastAPI backend.

## Backend Status: ✅ COMPLETE

All backend endpoints are implemented and ready to use:
- Authentication (JWT)
- Waste Management
- Pickups
- Recycling Stations
- Rewards
- Transactions
- Analytics
- Notifications
- Image Upload

## Frontend Status: ⚠️ NEEDS INTEGRATION

Currently, the frontend has:
- ✅ UI components
- ✅ Navigation structure
- ❌ No API calls
- ❌ No authentication flow
- ❌ No state management
- ❌ Hardcoded data only

## Step-by-Step Integration

### 1. Install Required Packages

```bash
cd TrashVerse
npm install axios @react-native-async-storage/async-storage
```

### 2. Create API Service Layer

Create `TrashVerse/services/api.ts`:

```typescript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure base URL (change for production)
const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('access_token');
      // Navigate to login screen
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Create API Functions

Create `TrashVerse/services/auth.ts`:

```typescript
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

export const authService = {
  async login(credentials: LoginCredentials) {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await api.post('/api/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token } = response.data;
    await AsyncStorage.setItem('access_token', access_token);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  async updateProfile(data: Partial<RegisterData>) {
    const response = await api.put('/api/auth/me', data);
    return response.data;
  },

  async logout() {
    await AsyncStorage.removeItem('access_token');
  },
};
```

Create `TrashVerse/services/waste.ts`:

```typescript
import api from './api';

export interface WasteEntry {
  waste_type: 'plastic' | 'paper' | 'metal' | 'electronics' | 'glass' | 'organic' | 'textile';
  weight_kg: number;
  description?: string;
  image_url?: string;
}

export const wasteService = {
  async createEntry(data: WasteEntry) {
    const response = await api.post('/api/waste/entries', data);
    return response.data;
  },

  async getEntries(skip = 0, limit = 50) {
    const response = await api.get('/api/waste/entries', {
      params: { skip, limit },
    });
    return response.data;
  },

  async deleteEntry(id: number) {
    await api.delete(`/api/waste/entries/${id}`);
  },
};
```

Create `TrashVerse/services/analytics.ts`:

```typescript
import api from './api';

export const analyticsService = {
  async getDashboard() {
    const response = await api.get('/api/analytics/dashboard');
    return response.data;
  },

  async getStats() {
    const response = await api.get('/api/analytics/stats');
    return response.data;
  },

  async getLeaderboard(limit = 10) {
    const response = await api.get('/api/analytics/leaderboard', {
      params: { limit },
    });
    return response.data;
  },
};
```

Create `TrashVerse/services/upload.ts`:

```typescript
import api from './api';

export const uploadService = {
  async uploadWasteImage(file: File | Blob) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/upload/waste-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async uploadProfileImage(file: File | Blob) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/upload/profile-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
```

### 4. Create Auth Context

Create `TrashVerse/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '@/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  total_earnings: number;
  total_pickups: number;
  total_waste_kg: number;
  total_co2_averted_kg: number;
  points: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    await authService.login({ username, password });
    const userData = await authService.getCurrentUser();
    setUser(userData);
  };

  const register = async (data: any) => {
    await authService.register(data);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    const userData = await authService.getCurrentUser();
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 5. Update Home Screen

Update `TrashVerse/app/(tabs)/home.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { analyticsService } from '@/services/analytics';

export default function HomeScreen() {
  const { user, refreshUser } = useAuth();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await analyticsService.getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, {user?.full_name || user?.username}</Text>
      
      {/* Stats from API */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>₦{user?.total_earnings || 0}</Text>
          <Text style={styles.statLabel}>Earned so far</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user?.total_pickups || 0}</Text>
          <Text style={styles.statLabel}>Pickups</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user?.total_waste_kg || 0}kg</Text>
          <Text style={styles.statLabel}>Waste</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user?.total_co2_averted_kg || 0}kg</Text>
          <Text style={styles.statLabel}>CO₂ Averted</Text>
        </View>
      </View>
    </View>
  );
}
```

### 6. Create Login Screen

Create `TrashVerse/app/login.tsx`:

```typescript
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError('');
      await login(username, password);
      router.replace('/(tabs)/home');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TrashVerse</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#84CC16',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  link: {
    color: '#84CC16',
    textAlign: 'center',
    marginTop: 15,
  },
});
```

### 7. Wrap App with AuthProvider

Update `TrashVerse/app/_layout.tsx`:

```typescript
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* Your existing layout */}
    </AuthProvider>
  );
}
```

## API Endpoints Reference

### Base URL
```
http://localhost:8000
```

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login (form data)
- `GET /api/auth/me` - Get user
- `PUT /api/auth/me` - Update profile

### Waste
- `POST /api/waste/entries` - Create entry
- `GET /api/waste/entries` - Get entries
- `DELETE /api/waste/entries/{id}` - Delete

### Analytics
- `GET /api/analytics/dashboard` - Dashboard
- `GET /api/analytics/stats` - Stats
- `GET /api/analytics/leaderboard` - Leaderboard

### Upload
- `POST /api/upload/waste-image` - Upload waste image
- `POST /api/upload/profile-image` - Upload profile image

## Testing

### Test Credentials
```
Username: charles
Password: password123
```

### Test API with curl
```bash
# Login
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=charles&password=password123"

# Get user info
curl -X GET "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Next Steps

1. ✅ Backend is ready
2. ⏳ Install packages: `npm install axios @react-native-async-storage/async-storage`
3. ⏳ Create service files
4. ⏳ Create AuthContext
5. ⏳ Create login/register screens
6. ⏳ Update home screen to use API
7. ⏳ Implement remaining screens

## Production Checklist

- [ ] Change API_BASE_URL to production URL
- [ ] Add error handling and retry logic
- [ ] Add loading states
- [ ] Add offline support
- [ ] Implement image caching
- [ ] Add analytics tracking
- [ ] Test on real devices
- [ ] Add push notification handling
