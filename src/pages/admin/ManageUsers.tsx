import React, { useState, useEffect, ChangeEvent } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { User } from '../../types/User';
import { userService } from '../../services/userService';

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({ idUsuario: 0, nombre: '', apellido: '', email: '', contrasena: '', tipo: 'Estudiante' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Error fetching users');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      await userService.createUser(currentUser);
      setShowModal(false);
      resetForm();
      fetchUsers();
    } catch (err) {
      setError('Error adding user');
    }
  };

  const handleUpdateUser = async () => {
    try {
      await userService.updateUser(currentUser.idUsuario, currentUser);
      setShowModal(false);
      resetForm();
      fetchUsers();
    } catch (err) {
      setError('Error updating user');
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        fetchUsers();
      } catch (err) {
        setError('Error deleting user');
      }
    }
  };

  const openEditModal = (user: User) => {
    setCurrentUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentUser({ idUsuario: 0, nombre: '', apellido: '', email: '', contrasena: '', tipo: 'Estudiante' });
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Usuarios</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" className="mb-3" onClick={() => {
        resetForm();
        setShowModal(true);
      }}>
        Añadir Nuevo Usuario
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idUsuario}>
              <td>{user.idUsuario}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.tipo}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => openEditModal(user)}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.idUsuario)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese nombre" 
                name="nombre"
                value={currentUser.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese apellido" 
                name="apellido"
                value={currentUser.apellido}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Ingrese email" 
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            {!isEditing && (
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Ingrese contraseña" 
                  name="contrasena"
                  value={currentUser.contrasena}
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Select 
                name="tipo"
                value={currentUser.tipo}
                onChange={handleInputChange}
              >
                <option value="Estudiante">Estudiante</option>
                <option value="Profesor">Profesor</option>
                <option value="Administrador">Administrador</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={isEditing ? handleUpdateUser : handleAddUser}>
            {isEditing ? 'Actualizar Usuario' : 'Añadir Usuario'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUsers;