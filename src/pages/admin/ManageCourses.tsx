import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { courseService } from '../../services/courseService';
import { careerService } from '../../services/careerService';
import { Curso } from '../../types/Curso';
import { Carrera } from '../../types/Carrera';

const ManageCourses: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoCurso, setNuevoCurso] = useState<Partial<Curso>>({ nombre: '', descripcion: '', carrera: { idCarrera: 0, nombre: '' } });

  useEffect(() => {
    fetchCursos();
    fetchCarreras();
  }, []);

  const fetchCursos = async () => {
    try {
      const cursosData = await courseService.getAllCursos();
      setCursos(cursosData);
    } catch (error) {
      console.error('Error fetching cursos:', error);
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

  const handleAddCourse = async () => {
    try {
      await courseService.createCurso(nuevoCurso as Curso);
      setShowModal(false);
      setNuevoCurso({ nombre: '', descripcion: '', carrera: { idCarrera: 0, nombre: '' } });
      fetchCursos();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleDeleteCourse = async (id: number) => {
    try {
      await courseService.deleteCurso(id);
      fetchCursos();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Cursos</h1>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Añadir Nuevo Curso
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.idCurso}>
              <td>{curso.idCurso}</td>
              <td>{curso.nombre}</td>
              <td>{curso.descripcion}</td>
              <td>{curso.carrera.nombre}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteCourse(curso.idCurso)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Nuevo Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Curso</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese el nombre del curso" 
                value={nuevoCurso.nombre}
                onChange={(e) => setNuevoCurso({...nuevoCurso, nombre: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                placeholder="Ingrese la descripción del curso" 
                value={nuevoCurso.descripcion}
                onChange={(e) => setNuevoCurso({...nuevoCurso, descripcion: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Carrera</Form.Label>
              <Form.Select
                value={nuevoCurso.carrera?.idCarrera}
                onChange={(e) => setNuevoCurso({...nuevoCurso, carrera: { idCarrera: parseInt(e.target.value), nombre: '' }})}
              >
                <option value="">Seleccione una carrera</option>
                {carreras.map((carrera) => (
                  <option key={carrera.idCarrera} value={carrera.idCarrera}>
                    {carrera.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddCourse}>
            Añadir Curso
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageCourses;