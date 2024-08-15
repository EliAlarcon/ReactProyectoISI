import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { Carrera } from '../../types/Carrera';
import { careerService } from '../../services/careerService';

const ManageCareers: React.FC = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaCarrera, setNuevaCarrera] = useState<Carrera>({ idCarrera: 0, nombre: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCarreras = async () => {
      const data = await careerService.getAllCarreras();
      setCarreras(data);
    };
    fetchCarreras();
  }, []);

  const handleAddCarrera = async () => {
    if (isEditing) {
      await careerService.updateCarrera(nuevaCarrera);
    } else {
      await careerService.createCarrera(nuevaCarrera);
    }
    setShowModal(false);
    setNuevaCarrera({ idCarrera: 0, nombre: '' });
    const updatedCarreras = await careerService.getAllCarreras();
    setCarreras(updatedCarreras);
    setIsEditing(false);
  };

  const handleEditCarrera = (carrera: Carrera) => {
    setNuevaCarrera(carrera);
    setShowModal(true);
    setIsEditing(true);
  };

  const handleDeleteCarrera = async (id: number) => {
    await careerService.deleteCarrera(id);
    const updatedCarreras = await careerService.getAllCarreras();
    setCarreras(updatedCarreras);
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Carreras</h1>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Añadir Nueva Carrera
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map((carrera) => (
            <tr key={carrera.idCarrera}>
              <td>{carrera.idCarrera}</td>
              <td>{carrera.nombre}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => handleEditCarrera(carrera)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteCarrera(carrera.idCarrera)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Carrera' : 'Añadir Nueva Carrera'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Carrera</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la carrera"
                value={nuevaCarrera.nombre}
                onChange={(e) => setNuevaCarrera({ ...nuevaCarrera, nombre: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddCarrera}>
            {isEditing ? 'Actualizar Carrera' : 'Añadir Carrera'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageCareers;