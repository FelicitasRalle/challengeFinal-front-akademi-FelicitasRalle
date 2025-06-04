import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import CursosAlumnoPage from './pages/CursosAlumnoPage';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import CursosAdminPage from './pages/CursosAdminPage';
import CursosProfesorPage from './pages/CursosProfesorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cursos" element={<CursosAlumnoPage />} />
        <Route path="/admin/usuarios" element={<SuperAdminDashboard />} />
        <Route path="/cursosAdmin" element={<CursosAdminPage />} />
        <Route path="/profesor/cursos" element={<CursosProfesorPage />} />
      </Routes>
    </Router>
  );
};

export default App;

