import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

// Definición de interfaces para la tipificación
interface Usuario {
  nombre: string;
  apellido: string;
}

interface Profesor {
  idProfesor: number;
  usuario: Usuario;
}

interface Materia {
  idMateria: number;
  nombre: string;
  descripcion: string;
  profesor: Profesor | null;
}

export const ManageSubjects: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([
    { idMateria: 1, nombre: 'Matemáticas', descripcion: 'Curso de matemáticas avanzadas', profesor: { idProfesor: 1, usuario: { nombre: 'Juan', apellido: 'Perez' } } },
    { idMateria: 2, nombre: 'Física', descripcion: 'Introducción a la física moderna', profesor: { idProfesor: 2, usuario: { nombre: 'Maria', apellido: 'Gomez' } } },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaMateria, setNuevaMateria] = useState<Materia>({ idMateria: 0, nombre: '', descripcion: '', profesor: null }); // Se agregó idMateria: 0
  const [profesores, setProfesores] = useState<Profesor[]>([
    { idProfesor: 1, usuario: { nombre: 'Juan', apellido: 'Perez' } },
    { idProfesor: 2, usuario: { nombre: 'Maria', apellido: 'Gomez' } },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrUpdateSubject = () => {
    if (editingId) {
      // Actualizar la materia existente en el array 'materias'
      setMaterias(materias.map(m => 
        m.idMateria === editingId ? {...nuevaMateria, idMateria: editingId} : m
      ));
    } else {
      // Agregar la nueva materia al array 'materias'
      setMaterias([...materias, {...nuevaMateria, idMateria: materias.length + 1}]);
    }
    setShowModal(false);
    setNuevaMateria({ idMateria: 0, nombre: '', descripcion: '', profesor: null }); // Se agregó idMateria: 0
    setEditingId(null);
  };

  const handleDeleteSubject = (id: number) => {
    setMaterias(materias.filter(m => m.idMateria !== id));
  };

  const handleEditSubject = (materia: Materia) => {
    setNuevaMateria(materia);
    setEditingId(materia.idMateria ?? null);
    setShowModal(true);
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
            <th>Profesor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia.idMateria}>
              <td>{materia.idMateria}</td>
              <td>{materia.nombre}</td>
              <td>{materia.descripcion}</td>
              <td>{materia.profesor?.usuario.nombre} {materia.profesor?.usuario.apellido}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => handleEditSubject(materia)}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => materia.idMateria && handleDeleteSubject(materia.idMateria)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Editar Materia' : 'Añadir Nueva Materia'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Materia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese nombre de la materia"
                value={nuevaMateria.nombre}
                onChange={(e) => setNuevaMateria({...nuevaMateria, nombre: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese una descripción"
                value={nuevaMateria.descripcion}
                onChange={(e) => setNuevaMateria({...nuevaMateria, descripcion: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profesor</Form.Label>
              <Form.Select
                value={nuevaMateria.profesor?.idProfesor || ''}
                onChange={(e) => {
                  const selectedProfesor = profesores.find(p => p.idProfesor === Number(e.target.value));
                  setNuevaMateria({...nuevaMateria, profesor: selectedProfesor || null});
                }}
              >
                <option value="">Seleccione un profesor</option>
                {profesores.map(profesor => (
                  <option key={profesor.idProfesor} value={profesor.idProfesor}>
                    {profesor.usuario.nombre} {profesor.usuario.apellido}
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
          <Button variant="primary" onClick={handleAddOrUpdateSubject}>
            {editingId ? 'Actualizar Materia' : 'Añadir Materia'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};