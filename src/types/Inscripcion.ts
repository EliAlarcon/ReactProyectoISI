import { User } from './User';
import { Carrera } from './Carrera';
import { Curso } from './Curso';

export interface Inscription {
  idInscripcion: number;
  estudiante: User;
  carrera: Carrera;
  curso: Curso;
  fechaInscripcion: Date;
}