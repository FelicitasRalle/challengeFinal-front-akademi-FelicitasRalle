import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarSuperadmin from '../components/NavBarSuperadmin';
import '../styles/estadisticas.css';

const EstadisticasPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [usersRes, coursesRes] = await Promise.all([
          axios.get('/users', config),
          axios.get('/courses', config)
        ]);

        const users = usersRes.data.users || usersRes.data;
        const courses = coursesRes.data.courses || coursesRes.data;
        setData({
          totalCursos: courses.length,
          totalUsuarios: users.length,
          totalProfesores: users.filter(u => u.role === 'professor').length,
          totalAlumnos: users.filter(u => u.role === 'student').length
        });
      } catch (err) {
        console.error('Error al cargar estadísticas', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <NavbarSuperadmin />
      <div className="estadisticas-container">
        <h2 className="estadisticas-title">Estadísticas Generales</h2>
        <div className="estadisticas-grid">
          <div className="estadistica-card">
            <h5>Cursos</h5>
            <p>{data?.totalCursos ?? '-'}</p>
          </div>
          <div className="estadistica-card">
            <h5>Usuarios</h5>
            <p>{data?.totalUsuarios ?? '-'}</p>
          </div>
          <div className="estadistica-card">
            <h5>Profesores</h5>
            <p>{data?.totalProfesores ?? '-'}</p>
          </div>
          <div className="estadistica-card">
            <h5>Alumnos</h5>
            <p>{data?.totalAlumnos ?? '-'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstadisticasPage;

