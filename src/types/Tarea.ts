import { Materia } from './Materia';

export interface Tarea {
  idTarea: number;
  nombre: string;
  descripcion: string;
  materia: Materia;
}