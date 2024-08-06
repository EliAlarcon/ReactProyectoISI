import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

interface Tarea {
  id: number;
  nombre: string;
  clase: string;
  fechaEntrega: string;
  estado: string;
}

const GradeAssignments: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, nombre: 'Proyecto Final', clase: 'Matemáticas Avanzadas', fechaEntrega: '2023-12-15', estado: 'Pendiente' },
    { id: 2, nombre: 'Ensayo', clase: 'Física Cuántica', fechaEntrega: '2023-11-30', estado: 'Calificado' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);

  const handleGrade = (tarea: Tarea) => {
    setTareaSeleccionada(tarea);
    setShowModal(true);
  };

  const handleSubmitGrade = () => {
    if (tareaSeleccionada) {
      const nuevasTareas = tareas.map(t => 
        t.id === tareaSeleccionada.id ? {...t, estado: 'Calificado'} : t
      );
      setTareas(nuevasTareas);
      setShowModal(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Calificar Tareas</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de la Tarea</th>
            <th>Clase</th>
            <th>Fecha de Entrega</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea.id}>
              <td>{tarea.id}</td>
              <td>{tarea.nombre}</td>
              <td>{tarea.clase}</td>
              <td>{tarea.fechaEntrega}</td>
              <td>{tarea.estado}</td>
              <td>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => handleGrade(tarea)}
                  disabled={tarea.estado === 'Calificado'}
                >
                  Calificar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Calificar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Tarea</Form.Label>
              <Form.Control type="text" value={tareaSeleccionada?.nombre} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Calificación</Form.Label>
              <Form.Control type="number" placeholder="Ingrese calificación" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comentarios</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmitGrade}>
            Enviar Calificación
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GradeAssignments;