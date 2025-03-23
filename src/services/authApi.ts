import api from '@/services/api';
import { TokenResponse, UserDTO, UserRegistrationRequest, UserUpdateRequest } from '@/types';

export const authApi = {
  refreshToken: async (refreshToken: string) => {
    return api.post<TokenResponse>('/auth/refresh', { refreshToken });
  },

  registerUser: async (userData: UserRegistrationRequest) => {
    return api.post<UserDTO>('/users/register', userData);
  },

  updateUser: async (userId: string, userData: UserUpdateRequest) => {
    return api.put<UserDTO>(`/users/${userId}`, userData);
  },

  resetPassword: async (userId: string, newPassword: string) => {
    return api.put(
      `/users/${userId}/reset-password?newPassword=${encodeURIComponent(newPassword)}`
    );
  },
};
