export interface User {
  idUsuario: number;
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
  tipo: 'Administrador' | 'Profesor' | 'Estudiante';
}