import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import CursosAlumnoPage from './pages/CursosAlumnoPage';
import SuperAdminDashboard from './pages/SuperAdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cursos" element={<CursosAlumnoPage />} />
        <Route path="/admin/usuarios" element={<SuperAdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

