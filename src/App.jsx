import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import CursosAlumnoPage from './pages/CursosAlumno';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cursos" element={<CursosAlumnoPage />} />
      </Routes>
    </Router>
  );
};

export default App;

