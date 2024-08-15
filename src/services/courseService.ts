import axios from 'axios';
import { Curso } from '../types/Curso';

const API_URL = 'http://localhost:8085/api/cursos';

export const courseService = {
    getAllCursos: async (): Promise<Curso[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getCursoById: async (id: number): Promise<Curso> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createCurso: async (curso: Curso): Promise<Curso> => {
    const response = await axios.post(API_URL, curso);
    return response.data;
  },

  updateCurso: async (curso: Curso): Promise<Curso> => {
    const response = await axios.put(API_URL, curso);
    return response.data;
  },

  deleteCurso: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  
};