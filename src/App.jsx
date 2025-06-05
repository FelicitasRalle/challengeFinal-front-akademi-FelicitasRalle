import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CursosAlumnoPage from './pages/CursosAlumnoPage';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import CursosAdminPage from './pages/CursosAdminPage';
import CursosProfesorPage from './pages/CursosProfesorPage';
import MisCursosAlumno from './pages/MisCursosAlumno';
import CalificacionesProfesorPage from './pages/CalificacionesProfesorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cursos" element={<CursosAlumnoPage />} />
        <Route path="/admin/usuarios" element={<SuperAdminDashboard />} />
        <Route path="/cursosAdmin" element={<CursosAdminPage />} />
        <Route path="/profesor/cursos" element={<CursosProfesorPage />} />
        <Route path="cursos/alumno/mis-cursos" element={<MisCursosAlumno />} />
        <Route path="profesor/calificaciones/:courseId" element={<CalificacionesProfesorPage />} />
      </Routes>
    </Router>
  );
};

export default App;

