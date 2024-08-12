import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  carrera: string;
  materias_matriculadas: string;
}

export const ManageStudents: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    { id: 1, nombre: 'Juan Pérez', email: 'jperez@gmail.com', carrera: 'Desarrollo de software', materias_matriculadas: 'Informática básica, Programación orientada a objetos I' },
    { id: 2, nombre: 'Maria Flores', email: 'mflores@gmail.com', carrera: 'Contabilidad', materias_matriculadas: 'Matemática Avanzada' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoEstudiante, setNuevoEstudiante] = useState({ nombre: '', email: '', carrera: '', materias_matriculadas: '' });

  const handleAddStudent = () => {
    setEstudiantes([...estudiantes, { ...nuevoEstudiante, id: estudiantes.length + 1 }]);
    setShowModal(false);
    setNuevoEstudiante({ nombre: '', email: '', carrera: '', materias_matriculadas: '' });
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Estudiantes</h1>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Añadir Nuevo Estudiante
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Carrera</th>
            <th>Materias matriculadas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>{estudiante.id}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.email}</td>
              <td>{estudiante.carrera}</td>
              <td>{estudiante.materias_matriculadas}</td>
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
          <Modal.Title>Añadir Nuevo Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese el nombre del estudiante" 
                value={nuevoEstudiante.nombre}
                onChange={(e) => setNuevoEstudiante({...nuevoEstudiante, nombre: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese el correo electrónico del estudiante" 
                value={nuevoEstudiante.email}
                onChange={(e) => setNuevoEstudiante({...nuevoEstudiante, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Carrera</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese la carrera del estudiante" 
                value={nuevoEstudiante.carrera}
                onChange={(e) => setNuevoEstudiante({...nuevoEstudiante, carrera: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Materias Matriculadas</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Ingrese una lista de las materias tomadas por el estudiante" 
                value={nuevoEstudiante.materias_matriculadas}
                onChange={(e) => setNuevoEstudiante({...nuevoEstudiante, materias_matriculadas: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddStudent}>
            Añadir Estudiante
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};