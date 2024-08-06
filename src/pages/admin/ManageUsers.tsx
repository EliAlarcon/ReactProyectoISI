import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

const ManageUsers: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@ejemplo.com', rol: 'Profesor' },
    { id: 2, nombre: 'María García', email: 'maria@ejemplo.com', rol: 'Administrador' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '', rol: '' });

  const handleAddUser = () => {
    setUsuarios([...usuarios, { ...nuevoUsuario, id: usuarios.length + 1 }]);
    setShowModal(false);
    setNuevoUsuario({ nombre: '', email: '', rol: '' });
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar Usuarios</h1>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Añadir Nuevo Usuario
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
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
          <Modal.Title>Añadir Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese nombre" 
                value={nuevoUsuario.nombre}
                onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Ingrese email" 
                value={nuevoUsuario.email}
                onChange={(e) => setNuevoUsuario({...nuevoUsuario, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Control 
                as="select"
                value={nuevoUsuario.rol}
                onChange={(e) => setNuevoUsuario({...nuevoUsuario, rol: e.target.value})}
              >
                <option value="">Seleccione rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Profesor">Profesor</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Añadir Usuario
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUsers;