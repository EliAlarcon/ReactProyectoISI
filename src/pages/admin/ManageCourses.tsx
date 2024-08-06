import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

interface Curso {
  id: number;
  nombre: string;
  profesor: string;
  fechaInicio: string;
  fechaFin: string;
}

const ManageCourses: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([
    { id: 1, nombre: 'Introducción a la Informática', profesor: 'Dr. Martínez', fechaInicio: '2023-09-01', fechaFin: '2023-12-15' },
    { id: 2, nombre: 'Matemáticas Avanzadas', profesor: 'Dra. Rodríguez', fechaInicio: '2023-09-01', fechaFin: '2023-12-15' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: '', profesor: '', fechaInicio: '', fechaFin: '' });

  const handleAddCourse = () => {
    setCursos([...cursos, { ...nuevoCurso, id: cursos.length + 1 }]);
    setShowModal(false);
    setNuevoCurso({ nombre: '', profesor: '', fechaInicio: '', fechaFin: '' });
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
            <th>Profesor</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.id}</td>
              <td>{curso.nombre}</td>
              <td>{curso.profesor}</td>
              <td>{curso.fechaInicio}</td>
              <td>{curso.fechaFin}</td>
              <td>
                <Button variant="info" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm">Eliminar</Button>
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
                placeholder="Ingrese nombre del curso" 
                value={nuevoCurso.nombre}
                onChange={(e) => setNuevoCurso({...nuevoCurso, nombre: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profesor</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese nombre del profesor" 
                value={nuevoCurso.profesor}
                onChange={(e) => setNuevoCurso({...nuevoCurso, profesor: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control 
                type="date" 
                value={nuevoCurso.fechaInicio}
                onChange={(e) => setNuevoCurso({...nuevoCurso, fechaInicio: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control 
                type="date" 
                value={nuevoCurso.fechaFin}
                onChange={(e) => setNuevoCurso({...nuevoCurso, fechaFin: e.target.value})}
              />
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