import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/common/NavBar';
import ProfessorSidebar from '../components/professor/ProfessorSidebar';
import ProfessorDashboard from '../pages/professor/ProfessorDashboard';
import ManageClasses from '../pages/professor/ManageClasses';
import GradeAssignments from '../pages/professor/GradeAssignments';

const ProfessorLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <ProfessorSidebar />
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path="/" element={<ProfessorDashboard />} />
              <Route path="/classes" element={<ManageClasses />} />
              <Route path="/grades" element={<GradeAssignments />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfessorLayout;