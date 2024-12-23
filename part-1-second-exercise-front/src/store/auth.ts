import { defineStore } from 'pinia';
import apiClient from '../api/apiClient';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { id: number; email: string } | null,
  }),
  actions: {
    async login(email: string, password: string) {
      const { data } = await apiClient.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    },
    logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.user = null;
    },
  },
});