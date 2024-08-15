import { Tarea } from './Tarea';
import { User } from './User';

export interface Nota {
  idNota: number;
  tarea: Tarea;
  estudiante: User;
  nota: number;
}