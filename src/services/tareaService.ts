import axios from 'axios';
import { Tarea } from '../types/Tarea';

const API_URL = 'http://localhost:8085/api/tareas';

export const tareaService = {
  getAllTareas: async (): Promise<Tarea[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getTareaById: async (id: number): Promise<Tarea> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createTarea: async (tarea: Tarea): Promise<Tarea> => {
    const response = await axios.post(API_URL, tarea);
    return response.data;
  },

  updateTarea: async (id: number, tarea: Tarea): Promise<Tarea> => {
    const response = await axios.put(`${API_URL}/${id}`, tarea);
    return response.data;
  },

  deleteTarea: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};