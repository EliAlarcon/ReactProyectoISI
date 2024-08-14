import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'http://localhost:8085/api';

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await axios.get(`${API_URL}/usuarios/${id}`);
    return response.data;
  },

  createUser: async (user: User): Promise<User> => {
    const response = await axios.post(`${API_URL}/usuarios`, user);
    return response.data;
  },

  updateUser: async (id: number, user: User): Promise<User> => {
    const response = await axios.put(`${API_URL}/usuarios/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/usuarios/${id}`);
  },

  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      const users: User[] = response.data;
      const user = users.find(u => u.email === email && u.contrasena === password);
      return user || null;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  },
};