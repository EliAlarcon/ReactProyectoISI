import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { subjectService } from '../../services/subjectService';

interface Clase {
  id: number;
  materia: string;
  horario: string;
  curso: string;
  semestre: string;
}

const ManageClasses: React.FC = () => {
  const {user} = useAuth();
  const [clases, setClases] = useState<Clase[]>([]);

  useEffect(() => {
    getAllMaterias();
  },)
  
  const getAllMaterias = async () => {
    const response = await subjectService.getAllMaterias();
    const nuevasClases: Clase[] = response
      .filter((element) => element.profesor.idUsuario === user?.idUsuario)
      .map((element, index) => ({
        id: index + 1,
        materia: element.nombre,
        horario: element.descripcion,
        curso: element.curso.nombre,
        semestre: element.curso.descripcion,
      }));

    setClases(nuevasClases);
    
    console.log(user?.idUsuario);
    console.log(clases);
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Clases</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Horario</th>
            <th>Curso</th>
            <th>Semestre</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase) => (
            <tr>
              <td>{clase.id}</td>
              <td>{clase.materia}</td>
              <td>{clase.horario}</td>
              <td>{clase.curso}</td>
              <td>{clase.semestre}</td>
              <td>
                <Button variant="info" size="sm" className="me-2">Ver Notas</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageClasses;