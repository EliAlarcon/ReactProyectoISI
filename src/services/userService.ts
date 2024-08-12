import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'http://localhost:8085/api/usuarios';

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createUser: async (user: User): Promise<User> => {
    const response = await axios.post(API_URL, user);
    return response.data;
  },

  updateUser: async (id: number, user: User): Promise<User> => {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await axios.get(API_URL);
      const users: User[] = response.data;
      const user = users.find(u => u.email === email && u.contrasena === password);
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  }
};