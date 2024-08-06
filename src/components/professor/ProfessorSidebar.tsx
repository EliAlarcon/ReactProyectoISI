import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfessorSidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">Panel del Profesor</div>
      <div className="list-group list-group-flush">
        <Link to="/professor" className="list-group-item list-group-item-action">Dashboard</Link>
        <Link to="/professor/classes" className="list-group-item list-group-item-action">Administrar Clases</Link>
        <Link to="/professor/grades" className="list-group-item list-group-item-action">Calificar Tareas</Link>
        <button onClick={logout} className="list-group-item list-group-item-action">Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default ProfessorSidebar;