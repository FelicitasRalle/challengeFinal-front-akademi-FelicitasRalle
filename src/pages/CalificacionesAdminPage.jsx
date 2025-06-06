import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NavbarSuperadmin from "../components/NavBarSuperadmin";
import "../styles/tablaCalificacionesAlumno.css";

const CalificacionesAdminPage = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get("/grades", config);
        setGrades(res.data);
      } catch (err) {
        setError("Error al cargar las calificaciones");
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  return (
    <>
      <NavbarSuperadmin />
      <div className="tabla-container">
        <h2 className="tabla-title">Todas las Calificaciones</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : grades.length === 0 ? (
          <p>No hay calificaciones para mostrar.</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Curso</th>
                <th>Trimestre</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g._id}>
                  <td>{g.student?.firstName}</td>
                  <td>{g.student?.lastName}</td>
                  <td>{g.course?.title}</td>
                  <td>{g.trimester}</td>
                  <td>{g.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default CalificacionesAdminPage;
