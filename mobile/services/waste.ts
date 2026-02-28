import api from './api';

export type WasteType = 'plastic' | 'paper' | 'metal' | 'electronics' | 'glass' | 'organic' | 'textile';

export interface WasteEntry {
  waste_type: WasteType;
  weight_kg: number;
  description?: string;
  image_url?: string;
}

export interface WasteEntryResponse {
  id: number;
  user_id: number;
  waste_type: string;
  weight_kg: number;
  description?: string;
  image_url?: string;
  ai_confidence?: number;
  ai_suggestions?: string;
  points_earned: number;
  amount_earned: number;
  created_at: string;
}

export const wasteService = {
  async createEntry(data: WasteEntry): Promise<WasteEntryResponse> {
    const response = await api.post('/api/waste/entries', data);
    return response.data;
  },

  async getEntries(skip = 0, limit = 50): Promise<WasteEntryResponse[]> {
    const response = await api.get('/api/waste/entries', {
      params: { skip, limit },
    });
    return response.data;
  },

  async getEntry(id: number): Promise<WasteEntryResponse> {
    const response = await api.get(`/api/waste/entries/${id}`);
    return response.data;
  },

  async deleteEntry(id: number): Promise<void> {
    await api.delete(`/api/waste/entries/${id}`);
  },
};
