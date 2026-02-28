import api from './api';

export interface RecyclingStation {
  id: number;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  accepted_waste_types?: string;
  operating_hours?: string;
  is_active: boolean;
  distance_km?: number;
}

export const stationService = {
  async getStations(
    latitude?: number,
    longitude?: number,
    max_distance_km?: number
  ): Promise<RecyclingStation[]> {
    const response = await api.get('/api/stations/', {
      params: { latitude, longitude, max_distance_km },
    });
    return response.data;
  },

  async getStation(id: number, latitude?: number, longitude?: number): Promise<RecyclingStation> {
    const response = await api.get(`/api/stations/${id}`, {
      params: { latitude, longitude },
    });
    return response.data;
  },

  async findNearest(
    latitude: number,
    longitude: number,
    waste_type?: string
  ): Promise<RecyclingStation> {
    const response = await api.get('/api/stations/nearby/search', {
      params: { latitude, longitude, waste_type },
    });
    return response.data;
  },
};
