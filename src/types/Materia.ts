import { Curso } from "./Curso";
import { User } from "./User";

export interface Materia {
  idMateria: number;
  nombre: string;
  descripcion: string;
  curso: Curso;
  profesor: User;
}
