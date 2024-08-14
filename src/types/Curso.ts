import { Carrera } from "./Carrera";

export interface Curso {
  idCurso: number;
  nombre: string;
  descripcion: string;
  carrera: Carrera;
}
