import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">Panel de Administración</div>
      <div className="list-group list-group-flush">
        <Link to="/admin" className="list-group-item list-group-item-action">Dashboard</Link>
        <Link to="/admin/users" className="list-group-item list-group-item-action">Administrar Usuarios</Link>
        <Link to="/admin/courses" className="list-group-item list-group-item-action">Administrar Cursos</Link>
        <button onClick={logout} className="list-group-item list-group-item-action">Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default AdminSidebar;