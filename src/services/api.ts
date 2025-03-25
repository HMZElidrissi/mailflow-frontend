import axios from 'axios';
import { store } from '@/store/store';
import { logout, refreshToken } from '@/features/auth/authSlice';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshTokenValue = localStorage.getItem('refreshToken');

        if (refreshTokenValue) {
          await store.dispatch(refreshToken()).unwrap();

          return api(error.config);
        } else {
          store.dispatch(logout());
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export default api;
