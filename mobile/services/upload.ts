import api from './api';

export interface UploadResponse {
  success: boolean;
  file_url: string;
  filename: string;
  message: string;
}

export const uploadService = {
  async uploadWasteImage(file: any): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/upload/waste-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async uploadProfileImage(file: any): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/upload/profile-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
