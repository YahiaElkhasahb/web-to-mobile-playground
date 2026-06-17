import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.fieldops.app/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('fieldops_jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401) SecureStore.deleteItemAsync('fieldops_jwt');
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

export const jobsApi = {
  getMyJobs: () => api.get('/jobs', { params: { assignedTo: 'me', date: 'today' } }),
  getAllJobs: () => api.get('/manager/jobs'),
  updateStatus: (id: string, status: string) =>
    api.patch(`/jobs/${id}/status`, { status }),
  addNote: (id: string, note: string) =>
    api.post(`/jobs/${id}/notes`, { note }),
  uploadPhoto: (id: string, uri: string) => {
    const form = new FormData();
    form.append('photo', { uri, name: 'photo.jpg', type: 'image/jpeg' } as any);
    return api.post(`/jobs/${id}/photos`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  checkin: (id: string, lat: number, lng: number) =>
    api.post(`/jobs/${id}/checkin`, { latitude: lat, longitude: lng, timestamp: new Date().toISOString() }),
};

export const managerApi = {
  getDashboard: () => api.get('/manager/dashboard'),
  assignJob: (jobId: string, technicianId: string) =>
    api.post(`/manager/jobs/${jobId}/assign`, { technicianId }),
};
