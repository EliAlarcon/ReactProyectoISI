import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

interface Clase {
  id: number;
  nombre: string;
  horario: string;
  aula: string;
  estudiantes: number;
}

const ManageClasses: React.FC = () => {
  const [clases, setClases] = useState<Clase[]>([
    { id: 1, nombre: 'Matemáticas Avanzadas', horario: 'Lunes y Miércoles 10:00-12:00', aula: 'A101', estudiantes: 30 },
    { id: 2, nombre: 'Física Cuántica', horario: 'Martes y Jueves 14:00-16:00', aula: 'B205', estudiantes: 25 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaClase, setNuevaClase] = useState({ nombre: '', horario: '', aula: '', estudiantes: 0 });

  const handleAddClass = () => {
    setClases([...clases, { ...nuevaClase, id: clases.length + 1 }]);
    setShowModal(false);
    setNuevaClase({ nombre: '', horario: '', aula: '', estudiantes: 0 });
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Clases</h1>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Añadir Nueva Clase
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Horario</th>
            <th>Aula</th>
            <th>Estudiantes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase) => (
            <tr key={clase.id}>
              <td>{clase.id}</td>
              <td>{clase.nombre}</td>
              <td>{clase.horario}</td>
              <td>{clase.aula}</td>
              <td>{clase.estudiantes}</td>
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
          <Modal.Title>Añadir Nueva Clase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Clase</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese nombre de la clase" 
                value={nuevaClase.nombre}
                onChange={(e) => setNuevaClase({...nuevaClase, nombre: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Horario</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese horario" 
                value={nuevaClase.horario}
                onChange={(e) => setNuevaClase({...nuevaClase, horario: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Aula</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese aula" 
                value={nuevaClase.aula}
                onChange={(e) => setNuevaClase({...nuevaClase, aula: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número de Estudiantes</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ingrese número de estudiantes" 
                value={nuevaClase.estudiantes}
                onChange={(e) => setNuevaClase({...nuevaClase, estudiantes: parseInt(e.target.value)})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddClass}>
            Añadir Clase
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageClasses;