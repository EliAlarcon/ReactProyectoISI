import axios from 'axios';
import { Nota } from '../types/Nota';

const API_URL = 'http://localhost:8085/api/notas';

export const notaService = {
  getAllNotas: async (): Promise<Nota[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getNotaById: async (id: number): Promise<Nota> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createNota: async (nota: Nota): Promise<Nota> => {
    const response = await axios.post(API_URL, nota);
    return response.data;
  },

  updateNota: async (nota: Nota): Promise<Nota> => {
    const response = await axios.put(API_URL, nota);
    return response.data;
  },

  deleteNota: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};