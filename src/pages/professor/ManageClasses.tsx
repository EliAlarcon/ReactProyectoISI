import React, { useEffect, useState } from 'react';
import { Table, Button, Accordion } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { subjectService } from '../../services/subjectService';
import { tareaService } from '../../services/tareaService';
import { notaService } from '../../services/notaService';
import { inscriptionService } from '../../services/inscriptionService';
import { Materia } from '../../types/Materia';
import { Tarea } from '../../types/Tarea';
import { Nota } from '../../types/Nota';
import { User } from '../../types/User';
import { Inscription } from '../../types/Inscripcion';

interface ClaseConNotas extends Materia {
  tareas: Tarea[];
  estudiantes: User[];
  notas: { [key: string]: Nota[] };
}

const ManageClasses: React.FC = () => {
  const { user } = useAuth();
  const [clases, setClases] = useState<ClaseConNotas[]>([]);

  useEffect(() => {
    getAllMaterias();
  }, []);

  const getAllMaterias = async () => {
    const response = await subjectService.getAllMaterias();
    const materias = response.filter(
      (element) => element.profesor.idUsuario === user?.idUsuario
    );

    const clasesConNotas = await Promise.all(
      materias.map(async (materia) => {
        const tareas = await tareaService.getAllTareas();
        const tareasDeMateria = tareas.filter(
          (tarea) => tarea.materia.idMateria === materia.idMateria
        );

        const inscripciones = await inscriptionService.getAllInscriptions();
        const estudiantesDeMateria = inscripciones
          .filter(
            (inscripcion) => inscripcion.curso.idCurso === materia.curso.idCurso
          )
          .map((inscripcion) => inscripcion.estudiante);

        const notas = await notaService.getAllNotas();
        const notasPorEstudiante = estudiantesDeMateria.reduce(
          (acc, estudiante) => {
            const notasDelEstudiante = notas.filter(
              (nota) =>
                nota.estudiante.idUsuario === estudiante.idUsuario &&
                tareasDeMateria.some(
                  (tarea) => tarea.idTarea === nota.tarea.idTarea
                )
            );
            acc[estudiante.idUsuario] = notasDelEstudiante;
            return acc;
          },
          {} as { [key: string]: Nota[] }
        );

        return {
          ...materia,
          tareas: tareasDeMateria,
          estudiantes: estudiantesDeMateria,
          notas: notasPorEstudiante,
        };
      })
    );

    setClases(clasesConNotas);
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Clases</h1>
      <Accordion>
        {clases.map((clase) => (
          <Accordion.Item key={clase.idMateria} eventKey={clase.idMateria.toString()}>
            <Accordion.Header>{clase.nombre}</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Tarea</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {clase.estudiantes.map((estudiante) => (
                    <>
                      {clase.notas[estudiante.idUsuario].map((nota) => (
                        <tr key={`${estudiante.idUsuario}-${nota.tarea.idTarea}`}>
                          <td>{`${estudiante.nombre} ${estudiante.apellido}`}</td>
                          <td>{nota.tarea.nombre}</td>
                          <td>{nota.nota}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default ManageClasses;