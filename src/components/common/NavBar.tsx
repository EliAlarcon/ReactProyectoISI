import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Sistema de Gestión Académica</Link>
        <div className="d-flex">
          <ul className="navbar-nav">
            {user && (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    {user.nombre} - {user.tipo === 'Administrador' ? 'Administrador' : 'Profesor'}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={logout}>Cerrar sesión</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;