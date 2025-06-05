import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAlumnosCurso, cargarNota } from "../redux/actions/calificacionesProfesorActions";
import NavbarProfesor from "../components/NavBarProfesor";
import "../styles/calificacionesProfesor.css";

const CalificacionesProfesorPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { alumnos, loading } = useSelector((state) => state.calificaciones);
  const [notas, setNotas] = useState({});

  useEffect(() => {
    dispatch(getAlumnosCurso(courseId));
  }, [dispatch, courseId]);

  const handleNotaChange = (studentId, value) => {
    setNotas((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleGuardar = (studentId) => {
    const value = Number(notas[studentId]);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      dispatch(cargarNota({ studentId, courseId, value }));
    } else {
      alert("La nota debe estar entre 0 y 10");
    }
  };

  return (
    <>
      <NavbarProfesor />
      <div className="p-4">
        <h2>Calificaciones</h2>
        {loading ? (
          <p>Cargando alumnos...</p>
        ) : (
          <table className="tabla-calificaciones">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Nota</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno._id}>
                  <td>{alumno.firstName}</td>
                  <td>{alumno.lastName}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={notas[alumno._id] || ""}
                      onChange={(e) => handleNotaChange(alumno._id, e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleGuardar(alumno._id)}>Guardar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default CalificacionesProfesorPage;
