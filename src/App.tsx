import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminLayout from './layout/AdminLayout';
import ProfessorLayout from './layout/ProfessorLayout';
import PrivateRoute from './components/common/PrivateRoute';

// eslint-disable-next-line
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import './App.css';
import { Cabecera } from './components/Cabecera';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/admin/*"
              element={
                <PrivateRoute roleRequired="admin">
                  <AdminLayout />
                </PrivateRoute>
              }
            />
            <Route
              path="/professor/*"
              element={
                <PrivateRoute roleRequired="professor">
                  <ProfessorLayout />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;