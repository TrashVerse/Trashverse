import api from './api';

export const uploadService = {
  async uploadWasteImage(file: File): Promise<{ file_url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/upload/waste-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async uploadProfileImage(file: File): Promise<{ file_url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/upload/profile-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
