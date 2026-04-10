import api from './api';
import { WasteType } from './waste';

export type PickupStatus = 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface PickupCreate {
  pickup_address: string;
  pickup_latitude?: number;
  pickup_longitude?: number;
  waste_type: WasteType;
  estimated_weight_kg: number;
  scheduled_date?: string;
  notes?: string;
}

export interface PickupResponse {
  id: number;
  user_id: number;
  status: string;
  pickup_address: string;
  pickup_latitude?: number;
  pickup_longitude?: number;
  scheduled_date?: string;
  completed_date?: string;
  waste_type?: string;
  estimated_weight_kg?: number;
  actual_weight_kg?: number;
  collector_id?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PickupUpdate {
  pickup_address?: string;
  pickup_latitude?: number;
  pickup_longitude?: number;
  waste_type?: WasteType;
  estimated_weight_kg?: number;
  actual_weight_kg?: number;
  scheduled_date?: string;
  notes?: string;
  status?: PickupStatus;
}

export const pickupService = {
  async schedulePickup(data: PickupCreate): Promise<PickupResponse> {
    const response = await api.post('/api/pickups/', data);
    return response.data;
  },

  async getPickups(skip = 0, limit = 50, status?: PickupStatus): Promise<PickupResponse[]> {
    const response = await api.get('/api/pickups/', {
      params: { skip, limit, status },
    });
    return response.data;
  },

  async getPickup(id: number): Promise<PickupResponse> {
    const response = await api.get(`/api/pickups/${id}`);
    return response.data;
  },

  async updatePickup(id: number, data: PickupUpdate): Promise<PickupResponse> {
    const response = await api.put(`/api/pickups/${id}`, data);
    return response.data;
  },

  async cancelPickup(id: number): Promise<void> {
    await api.delete(`/api/pickups/${id}`);
  },
};
