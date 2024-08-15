import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { tareaService } from '../../services/tareaService';
import { Tarea } from '../../types/Tarea';
import { Materia } from '../../types/Materia';
import { subjectService } from '../../services/subjectService';

const ManageTareas: React.FC = () => {
  const { user } = useAuth();
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTarea, setCurrentTarea] = useState<Tarea | null>(null);

  useEffect(() => {
    getAllTareas();
    getAllMaterias();
  }, []);

  const getAllTareas = async () => {
    const response = await tareaService.getAllTareas();
    setTareas(response);
  };

  const getAllMaterias = async () => {
    const response = await subjectService.getAllMaterias();
    setMaterias(response);
  };

  const handleCreateTarea = () => {
    setCurrentTarea(null);
    setShowModal(true);
  };

  const handleEditTarea = (tarea: Tarea) => {
    setCurrentTarea(tarea);
    setShowModal(true);
  };

  const handleDeleteTarea = async (id: number) => {
    await tareaService.deleteTarea(id);
    getAllTareas();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nuevaTarea: Tarea = {
      idTarea: currentTarea ? currentTarea.idTarea : 0,
      nombre: formData.get('nombre') as string,
      descripcion: formData.get('descripcion') as string,
      materia: materias.find(m => m.idMateria === Number(formData.get('idMateria')))!
    };

    if (currentTarea) {
      await tareaService.updateTarea(currentTarea.idTarea, nuevaTarea);
    } else {
      await tareaService.createTarea(nuevaTarea);
    }

    setShowModal(false);
    getAllTareas();
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Tareas</h1>
      <Button variant="primary" onClick={handleCreateTarea} className="mb-3">
        Crear Nueva Tarea
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Materia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea.idTarea}>
              <td>{tarea.idTarea}</td>
              <td>{tarea.nombre}</td>
              <td>{tarea.descripcion}</td>
              <td>{tarea.materia.nombre}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => handleEditTarea(tarea)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteTarea(tarea.idTarea)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentTarea ? 'Editar Tarea' : 'Crear Tarea'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                required
                defaultValue={currentTarea?.nombre}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                rows={3}
                defaultValue={currentTarea?.descripcion}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Materia</Form.Label>
              <Form.Select name="idMateria" required defaultValue={currentTarea?.materia.idMateria}>
                {materias.map((materia) => (
                  <option key={materia.idMateria} value={materia.idMateria}>
                    {materia.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentTarea ? 'Actualizar' : 'Crear'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageTareas;