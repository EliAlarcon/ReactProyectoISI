import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { userService } from '../../services/userService';
import { careerService } from '../../services/careerService';
import { courseService } from '../../services/courseService';
import { inscriptionService } from '../../services/inscriptionService';
import { User } from '../../types/User';
import { Carrera } from '../../types/Carrera';
import { Curso } from '../../types/Curso';
import { Inscription } from '../../types/Inscripcion';

export const ManageStudents: React.FC = () => {
  const [inscripciones, setInscripciones] = useState<Inscription[]>([]);
  const [estudiantes, setEstudiantes] = useState<User[]>([]);
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaInscripcion, setNuevaInscripcion] = useState<Partial<Inscription>>({
    estudiante: undefined,
    carrera: undefined,
    curso: undefined,
    fechaInscripcion: new Date(),
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchInscripciones();
    fetchEstudiantes();
    fetchCarreras();
    fetchCursos();
  }, []);

  const fetchInscripciones = async () => {
    try {
      const inscripcionesData = await inscriptionService.getAllInscriptions();
      setInscripciones(inscripcionesData);
    } catch (error) {
      console.error('Error fetching inscripciones:', error);
    }
  };

  const fetchEstudiantes = async () => {
    try {
      const users = await userService.getAllUsers();
      const estudiantesData = users.filter(user => user.tipo === 'Estudiante');
      setEstudiantes(estudiantesData);
    } catch (error) {
      console.error('Error fetching estudiantes:', error);
    }
  };

  const fetchCarreras = async () => {
    try {
      const carrerasData = await careerService.getAllCarreras();
      setCarreras(carrerasData);
    } catch (error) {
      console.error('Error fetching carreras:', error);
    }
  };

  const fetchCursos = async () => {
    try {
      const cursosData = await courseService.getAllCursos();
      setCursos(cursosData);
    } catch (error) {
      console.error('Error fetching cursos:', error);
    }
  };

  const handleAddOrUpdateInscription = async () => {
    try {
      if (editingId) {
        await inscriptionService.updateInscription({ ...nuevaInscripcion, idInscripcion: editingId } as Inscription);
      } else {
        await inscriptionService.createInscription(nuevaInscripcion as Inscription);
      }
      setShowModal(false);
      setNuevaInscripcion({
        estudiante: undefined,
        carrera: undefined,
        curso: undefined,
        fechaInscripcion: new Date(),
      });
      setEditingId(null);
      fetchInscripciones();
    } catch (error) {
      console.error('Error adding/updating inscription:', error);
    }
  };

  const handleEditInscription = (inscripcion: Inscription) => {
    setNuevaInscripcion(inscripcion);
    setEditingId(inscripcion.idInscripcion);
    setShowModal(true);
  };

  const handleDeleteInscription = async (id: number) => {
    try {
      await inscriptionService.deleteInscription(id);
      fetchInscripciones();
    } catch (error) {
      console.error('Error deleting inscription:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Inscripciones</h1>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Añadir Nueva Inscripción
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Email</th>
            <th>Carrera</th>
            <th>Curso</th>
            <th>Fecha de Inscripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((inscripcion) => (
            <tr key={inscripcion.idInscripcion}>
              <td>{inscripcion.idInscripcion}</td>
              <td>{inscripcion.estudiante.nombre} {inscripcion.estudiante.apellido}</td>
              <td>{inscripcion.estudiante.email}</td>
              <td>{inscripcion.carrera.nombre}</td>
              <td>{inscripcion.curso.nombre}</td>
              <td>{new Date(inscripcion.fechaInscripcion).toLocaleDateString()}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => handleEditInscription(inscripcion)}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteInscription(inscripcion.idInscripcion)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Editar Inscripción' : 'Añadir Nueva Inscripción'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Estudiante</Form.Label>
              <Form.Select
                value={nuevaInscripcion.estudiante?.idUsuario || ''}
                onChange={(e) => {
                  const selectedEstudiante = estudiantes.find(est => est.idUsuario === Number(e.target.value));
                  setNuevaInscripcion({...nuevaInscripcion, estudiante: selectedEstudiante});
                }}
              >
                <option value="">Seleccione un estudiante</option>
                {estudiantes.map(estudiante => (
                  <option key={estudiante.idUsuario} value={estudiante.idUsuario}>
                    {estudiante.nombre} {estudiante.apellido} - {estudiante.email}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Carrera</Form.Label>
              <Form.Select
                value={nuevaInscripcion.carrera?.idCarrera || ''}
                onChange={(e) => {
                  const selectedCarrera = carreras.find(car => car.idCarrera === Number(e.target.value));
                  setNuevaInscripcion({...nuevaInscripcion, carrera: selectedCarrera});
                }}
              >
                <option value="">Seleccione una carrera</option>
                {carreras.map(carrera => (
                  <option key={carrera.idCarrera} value={carrera.idCarrera}>
                    {carrera.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Curso</Form.Label>
              <Form.Select
                value={nuevaInscripcion.curso?.idCurso || ''}
                onChange={(e) => {
                  const selectedCurso = cursos.find(cur => cur.idCurso === Number(e.target.value));
                  setNuevaInscripcion({...nuevaInscripcion, curso: selectedCurso});
                }}
              >
                <option value="">Seleccione un curso</option>
                {cursos.map(curso => (
                  <option key={curso.idCurso} value={curso.idCurso}>
                    {curso.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Inscripción</Form.Label>
              <Form.Control
                type="date"
                value={nuevaInscripcion.fechaInscripcion ? new Date(nuevaInscripcion.fechaInscripcion).toISOString().split('T')[0] : ''}
                onChange={(e) => setNuevaInscripcion({...nuevaInscripcion, fechaInscripcion: new Date(e.target.value)})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateInscription}>
            {editingId ? 'Actualizar Inscripción' : 'Añadir Inscripción'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};