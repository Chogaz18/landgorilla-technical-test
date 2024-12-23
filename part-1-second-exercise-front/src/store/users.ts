import { defineStore } from 'pinia';
import apiClient from '../api/apiClient';

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as any[],
    newUser: { name: '', email: '' },
    editingUser: null as any | null,
    errorMessage: '',
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await apiClient.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async createUser() {
      if (!this.newUser.name || !this.newUser.email) {
        this.errorMessage = 'Name and email are required!';
        return;
      }
      try {
        const response = await apiClient.post('/users', this.newUser);
        this.users.push(response.data); 
        this.newUser = { name: '', email: '' }; 
        this.errorMessage = '';
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    async deleteUser(id: number) {
      if (confirm('¿Eliminas al usuario?')) {
        try {
          await apiClient.delete(`/users/${id}`);
          this.users = this.users.filter((user) => user.id !== id); 
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    },
    editUser(user: any) {
      this.editingUser = { ...user }; 
    },
    async saveUser() {
      try {
        const response = await apiClient.put(`/users/${this.editingUser.id}`, this.editingUser);
        const index = this.users.findIndex((user) => user.id === this.editingUser.id);
        if (index !== -1) {
          this.users[index] = response.data; 
        }
        this.editingUser = null;
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  },
});
