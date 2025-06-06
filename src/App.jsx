import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CursosAlumnoPage from './pages/CursosAlumnoPage';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import CursosAdminPage from './pages/CursosAdminPage';
import CursosProfesorPage from './pages/CursosProfesorPage';
import MisCursosAlumno from './pages/MisCursosAlumno';
import CalificacionesProfesorPage from './pages/CalificacionesProfesorPage';
import CalificacionesAlumnoPage from './pages/CalificacionesAlumnoPage';
import RegisterPage from './pages/RegisterPage';
import OlvidarContraseñaPage from './pages/OlvidarContraseñaPage';
import ResetContraseñaPage from './pages/ResetContraseña';
import EstadisticasPage from './pages/EstadisticasPage';
import CalificacionesAdminPage from './pages/CalificacionesAdminPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cursos" element={<CursosAlumnoPage />} />
        <Route path="/admin/usuarios" element={<SuperAdminDashboard />} />
        <Route path="/cursosAdmin" element={<CursosAdminPage />} />
        <Route path="/profesor/cursos" element={<CursosProfesorPage />} />
        <Route path="/calificaciones/alumno/mis-cursos" element={<MisCursosAlumno />} />
        <Route path="cursos/alumno/mis-cursos" element={<MisCursosAlumno />} />
        <Route path="profesor/calificaciones/:courseId" element={<CalificacionesProfesorPage />} />
        <Route path="calificaciones" element={<CalificacionesAlumnoPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<OlvidarContraseñaPage />} />
        <Route path="/reset-password" element={<ResetContraseñaPage />} />
        <Route path="/admin/estadisticas" element={<EstadisticasPage />} />
        <Route path="/admin/calificaciones" element={<CalificacionesAdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;

