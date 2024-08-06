import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid"> {/* Cambiado a container-fluid para ocupar todo el ancho */}
        <Link className="navbar-brand" to="/">Sistema de Gestión Académica</Link>
        <div className="d-flex"> {/* Contenedor para alinear el botón a la derecha */}
          <ul className="navbar-nav"> 
          {user && (
            <>
              <li className="nav-item">
                <span className="nav-link">
                  {user.name} - {user.role === 'admin' ? 'Administrador' : 'Profesor'}
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