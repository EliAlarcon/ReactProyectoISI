import axios from 'axios';
import { Inscription } from '../types/Inscripcion';

const API_URL = 'http://localhost:8085/api/inscripciones';

export const inscriptionService = {
  getAllInscriptions: async (): Promise<Inscription[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getInscriptionById: async (id: number): Promise<Inscription> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createInscription: async (inscription: Inscription): Promise<Inscription> => {
    const response = await axios.post(API_URL, inscription);
    return response.data;
  },

  updateInscription: async (inscription: Inscription): Promise<Inscription> => {
    const response = await axios.put(API_URL, inscription);
    return response.data;
  },

  deleteInscription: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};