import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { subjectService } from '../../services/subjectService';
import { userService } from '../../services/userService';
import { courseService } from '../../services/courseService';
import { Materia } from '../../types/Materia';
import { User } from '../../types/User';
import { Curso } from '../../types/Curso';

export const ManageSubjects: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaMateria, setNuevaMateria] = useState<Partial<Materia>>({ 
    nombre: '', 
    descripcion: '', 
    curso: undefined,
    profesor: undefined
  });
  const [profesores, setProfesores] = useState<User[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchMaterias();
    fetchProfesores();
    fetchCursos();
  }, []);

  const fetchMaterias = async () => {
    try {
      const materiasData = await subjectService.getAllMaterias();
      setMaterias(materiasData);
    } catch (error) {
      console.error('Error fetching materias:', error);
    }
  };

  const fetchProfesores = async () => {
    try {
      const users = await userService.getAllUsers();
      const profesoresData = users.filter(user => user.tipo === 'Profesor');
      setProfesores(profesoresData);
    } catch (error) {
      console.error('Error fetching profesores:', error);
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

  const handleAddOrUpdateSubject = async () => {
    try {
      if (editingId) {
        await subjectService.updateMateria({ ...nuevaMateria, idMateria: editingId } as Materia);
      } else {
        await subjectService.createMateria(nuevaMateria as Materia);
      }
      setShowModal(false);
      setNuevaMateria({ nombre: '', descripcion: '', curso: undefined, profesor: undefined });
      setEditingId(null);
      fetchMaterias();
    } catch (error) {
      console.error('Error adding/updating materia:', error);
    }
  };

  const handleDeleteSubject = async (id: number) => {
    try {
      await subjectService.deleteMateria(id);
      fetchMaterias();
    } catch (error) {
      console.error('Error deleting materia:', error);
    }
  };

  const handleEditSubject = (materia: Materia) => {
    setNuevaMateria(materia);
    setEditingId(materia.idMateria);
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
            <th>Curso</th>
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
              <td>{materia.curso?.nombre}</td>
              <td>{materia.profesor?.nombre} {materia.profesor?.apellido}</td>
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
              <Form.Label>Descripción (Horario)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese el horario, ej: 7:00 - 10:30"
                value={nuevaMateria.descripcion}
                onChange={(e) => setNuevaMateria({...nuevaMateria, descripcion: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Curso</Form.Label>
              <Form.Select
                value={nuevaMateria.curso?.idCurso || ''}
                onChange={(e) => {
                  const selectedCurso = cursos.find(c => c.idCurso === Number(e.target.value));
                  setNuevaMateria({...nuevaMateria, curso: selectedCurso});
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
              <Form.Label>Profesor</Form.Label>
              <Form.Select
                value={nuevaMateria.profesor?.idUsuario || ''}
                onChange={(e) => {
                  const selectedProfesor = profesores.find(p => p.idUsuario === Number(e.target.value));
                  setNuevaMateria({...nuevaMateria, profesor: selectedProfesor});
                }}
              >
                <option value="">Seleccione un profesor</option>
                {profesores.map(profesor => (
                  <option key={profesor.idUsuario} value={profesor.idUsuario}>
                    {profesor.nombre} {profesor.apellido}
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