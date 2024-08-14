import axios from 'axios';
import { Carrera } from '../types/Carrera';

const API_URL = 'http://localhost:8085/api/carreras';

export const careerService = {
  getAllCarreras: async (): Promise<Carrera[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getCarreraById: async (id: number): Promise<Carrera> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createCarrera: async (carrera: Carrera): Promise<Carrera> => {
    const response = await axios.post(API_URL, carrera);
    return response.data;
  },

  updateCarrera: async (carrera: Carrera): Promise<Carrera> => {
    const response = await axios.put(API_URL, carrera);
    return response.data;
  },

  deleteCarrera: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};