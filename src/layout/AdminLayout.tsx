import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/common/NavBar';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageCourses from '../pages/admin/ManageCourses';

const AdminLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <AdminSidebar />
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/users" element={<ManageUsers />} />
              <Route path="/courses" element={<ManageCourses />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;