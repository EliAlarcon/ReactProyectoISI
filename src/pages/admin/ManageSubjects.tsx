import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

interface Materia {
  id: number;
  nombre: string;
  descripcion: string;
}

export const ManageSubjects: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([
    { id: 1, nombre: 'Introducción a la Informática', descripcion: 'Materia que introduce al uso de computadoras y al uso de paquetes ofimáticos' },
    { id: 2, nombre: 'Matemáticas Avanzadas', descripcion: 'Materia para niveles avanzados que hayan aprobado los niveles intermedios de matemáticas' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaMateria, setNuevaMateria] = useState({ nombre: '', descripcion: '' });

  const handleAddSubject = () => {
    setMaterias([...materias, { ...nuevaMateria, id: materias.length + 1 }]);
    setShowModal(false);
    setNuevaMateria({ nombre: '', descripcion: '' });
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Materias</h1>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Añadir Nueva Materia
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia.id}>
              <td>{materia.id}</td>
              <td>{materia.nombre}</td>
              <td>{materia.descripcion}</td>
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
          <Modal.Title>Añadir Nueva Materia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Materia</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese nombre del materia" 
                value={nuevaMateria.nombre}
                onChange={(e) => setNuevaMateria({...nuevaMateria, nombre: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profesor</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Ingrese una descripción" 
                value={nuevaMateria.descripcion}
                onChange={(e) => setNuevaMateria({...nuevaMateria, descripcion: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddSubject}>
            Añadir Materia
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};