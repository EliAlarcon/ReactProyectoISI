import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Accordion } from 'react-bootstrap';
import { tareaService } from '../../services/tareaService';
import { notaService } from '../../services/notaService';
import { subjectService } from '../../services/subjectService';
import { inscriptionService } from '../../services/inscriptionService';
import { Tarea } from '../../types/Tarea';
import { Nota } from '../../types/Nota';
import { Materia } from '../../types/Materia';
import { User } from '../../types/User';
import { Inscription } from '../../types/Inscripcion';

interface TareaConEstudiantesYNotas extends Tarea {
  estudiantes: User[];
  notas: { [key: number]: Nota };
}

interface MateriaConTareas extends Materia {
  tareas: TareaConEstudiantesYNotas[];
}

const GradeAssignments: React.FC = () => {
  const [materiasConTareas, setMateriasConTareas] = useState<MateriaConTareas[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<TareaConEstudiantesYNotas | null>(null);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<User | null>(null);
  const [calificacion, setCalificacion] = useState<number | ''>('');
  const [notaExistente, setNotaExistente] = useState<Nota | null>(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const materias = await subjectService.getAllMaterias();
    const tareas = await tareaService.getAllTareas();
    const inscripciones = await inscriptionService.getAllInscriptions();
    const notas = await notaService.getAllNotas();

    const materiasConTareasData = await Promise.all(materias.map(async (materia) => {
      const tareasDeMateria = tareas.filter(tarea => tarea.materia.idMateria === materia.idMateria);
      const tareasConEstudiantesYNotas = await Promise.all(tareasDeMateria.map(async (tarea) => {
        const estudiantesInscritos = inscripciones
          .filter(inscripcion => inscripcion.curso.idCurso === materia.curso.idCurso)
          .map(inscripcion => inscripcion.estudiante);
        const notasDeTarea = notas.filter(nota => nota.tarea.idTarea === tarea.idTarea);
        const notasPorEstudiante = notasDeTarea.reduce((acc, nota) => {
          acc[nota.estudiante.idUsuario] = nota;
          return acc;
        }, {} as { [key: number]: Nota });
        return { ...tarea, estudiantes: estudiantesInscritos, notas: notasPorEstudiante };
      }));
      return { ...materia, tareas: tareasConEstudiantesYNotas };
    }));

    setMateriasConTareas(materiasConTareasData);
  };

  const handleGrade = (tarea: TareaConEstudiantesYNotas, estudiante: User) => {
    setTareaSeleccionada(tarea);
    setEstudianteSeleccionado(estudiante);
    const notaExistente = tarea.notas[estudiante.idUsuario];
    if (notaExistente) {
      setCalificacion(notaExistente.nota);
      setNotaExistente(notaExistente);
    } else {
      setCalificacion('');
      setNotaExistente(null);
    }
    setShowModal(true);
  };

  const handleSubmitGrade = async () => {
    if (tareaSeleccionada && estudianteSeleccionado && calificacion !== '') {
      const nuevaNota: Nota = {
        idNota: notaExistente ? notaExistente.idNota : 0,
        tarea: tareaSeleccionada,
        estudiante: estudianteSeleccionado,
        nota: Number(calificacion)
      };

      if (notaExistente) {
        await notaService.updateNota(nuevaNota);
      } else {
        await notaService.createNota(nuevaNota);
      }
      setShowModal(false);
      setCalificacion('');
      setNotaExistente(null);
      await cargarDatos(); // Recargar datos después de calificar
    }
  };

  return (
    <div className="container mt-4">
      <h1>Calificar Tareas</h1>
      <Accordion>
        {materiasConTareas.map((materia) => (
          <Accordion.Item key={materia.idMateria} eventKey={materia.idMateria.toString()}>
            <Accordion.Header>{materia.nombre}</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombre de la Tarea</th>
                    <th>Estudiante</th>
                    <th>Calificación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {materia.tareas.flatMap((tarea) =>
                    tarea.estudiantes.map((estudiante) => (
                      <tr key={`${tarea.idTarea}-${estudiante.idUsuario}`}>
                        <td>{tarea.nombre}</td>
                        <td>{`${estudiante.nombre} ${estudiante.apellido}`}</td>
                        <td>
                          {tarea.notas[estudiante.idUsuario]
                            ? tarea.notas[estudiante.idUsuario].nota
                            : 'No calificado'}
                        </td>
                        <td>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={() => handleGrade(tarea, estudiante)}
                          >
                            {tarea.notas[estudiante.idUsuario] ? 'Editar' : 'Calificar'}
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{notaExistente ? 'Editar Calificación' : 'Calificar Tarea'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Tarea</Form.Label>
              <Form.Control type="text" value={tareaSeleccionada?.nombre} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estudiante</Form.Label>
              <Form.Control type="text" value={`${estudianteSeleccionado?.nombre} ${estudianteSeleccionado?.apellido}`} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Calificación</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ingrese calificación" 
                value={calificacion}
                onChange={(e) => setCalificacion(e.target.value ? Number(e.target.value) : '')}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmitGrade}>
            {notaExistente ? 'Actualizar' : 'Enviar'} Calificación
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GradeAssignments;