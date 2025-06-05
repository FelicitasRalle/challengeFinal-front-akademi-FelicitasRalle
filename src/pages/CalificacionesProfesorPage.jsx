import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAlumnosCurso, cargarNota, eliminarNota } from "../redux/actions/calificacionesProfesorActions";
import NavbarProfesor from "../components/NavBarProfesor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/calificacionesProfesor.css";

const CalificacionesProfesorPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { alumnos, loading, notas, trimestres, notaIds } = useSelector((state) => state.calificaciones);
  const [localNotas, setLocalNotas] = useState({});
  const [localTrimestres, setLocalTrimestres] = useState({});
  const [status, setStatus] = useState({}); // estado por alumno: 'guardando', 'eliminando', null

  useEffect(() => {
    dispatch(getAlumnosCurso(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    setLocalNotas(notas);
    setLocalTrimestres(trimestres);
  }, [notas, trimestres]);

  const handleNotaChange = (studentId, value) => {
    setLocalNotas((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleTrimestreChange = (studentId, value) => {
    setLocalTrimestres((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleGuardar = async (studentId) => {
    const value = Number(localNotas[studentId]);
    const trimester = Number(localTrimestres[studentId]);
    if (!isNaN(value) && value >= 0 && value <= 10 && [1, 2, 3].includes(trimester)) {
      setStatus((prev) => ({ ...prev, [studentId]: "guardando" }));
      const notaId = notaIds[studentId];
      await dispatch(cargarNota({ studentId, courseId, value, trimester, notaId }));
      toast.success(notaId ? "Nota actualizada" : "Nota guardada");
      setStatus((prev) => ({ ...prev, [studentId]: null }));
      dispatch(getAlumnosCurso(courseId)); // recargar
    } else {
      alert("La nota debe estar entre 0 y 10 y el trimestre entre 1 y 3");
    }
  };

  const handleEliminar = async (studentId) => {
    const notaId = notaIds[studentId];
    if (!notaId) return;
    if (!window.confirm("¿Estás seguro de eliminar esta nota?")) return;

    setStatus((prev) => ({ ...prev, [studentId]: "eliminando" }));
    await dispatch(eliminarNota(notaId));
    toast.info("Nota eliminada");
    setStatus((prev) => ({ ...prev, [studentId]: null }));
    dispatch(getAlumnosCurso(courseId));
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
                <th>Trimestre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => {
                const id = alumno._id;
                const nota = localNotas[id];
                const trimestre = localTrimestres[id];
                const isGuardando = status[id] === "guardando";
                const isEliminando = status[id] === "eliminando";
                const tieneNota = notaIds[id];

                return (
                  <tr key={id}>
                    <td>{alumno.firstName}</td>
                    <td>{alumno.lastName}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={nota || ""}
                        onChange={(e) => handleNotaChange(id, e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={trimestre || ""}
                        onChange={(e) => handleTrimestreChange(id, e.target.value)}
                      >
                        <option value="">Seleccionar</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleGuardar(id)} disabled={isGuardando || isEliminando}>
                        {isGuardando ? "Guardando..." : tieneNota ? "Editar" : "Guardar"}
                      </button>
                      {tieneNota && (
                        <button onClick={() => handleEliminar(id)} disabled={isGuardando || isEliminando}>
                          {isEliminando ? "Eliminando..." : "Eliminar"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default CalificacionesProfesorPage;

