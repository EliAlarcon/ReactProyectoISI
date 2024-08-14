import axios from 'axios';
import { Materia } from '../types/Materia';

const API_URL = 'http://localhost:8085/api/materias';

export const materiaService = {
    getAllMaterias: async (): Promise<Materia[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getMateriaById: async (id: number): Promise<Materia> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createMateria: async (materia: Materia): Promise<Materia> => {
    const response = await axios.post(API_URL, materia);
    return response.data;
  },

  updateMateria: async (materia: Materia): Promise<Materia> => {
    const response = await axios.put(API_URL, materia);
    return response.data;
  },

  deleteMateria: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  
};