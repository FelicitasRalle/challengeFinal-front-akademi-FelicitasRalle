import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMisCursos,
  cancelarInscripcion,
} from "../redux/actions/cursosAlumnoActions";
import NavBarAlumno from "../components/NavBarAlumno";
import "../styles/misCursosAlumno.css";

const MisCursosAlumno = () => {
  const dispatch = useDispatch();
  const {
    misCursos = [],
    loading,
    error,
  } = useSelector((state) => state.cursos);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [cursoAEliminar, setCursoAEliminar] = useState(null);

  useEffect(() => {
    dispatch(getMisCursos());
  }, [dispatch]);

  const confirmarCancelar = (id) => {
    setCursoAEliminar(id);
    setMostrarModal(true);
  };

  const ejecutarCancelacion = () => {
    if (cursoAEliminar) {
      dispatch(cancelarInscripcion(cursoAEliminar));
      setMostrarModal(false);
      setCursoAEliminar(null);
    }
  };

  return (
    <>
      <NavBarAlumno />
      <div className="p-4">
        <h1 className="titulo-mis-cursos">Mis Cursos</h1>

        {loading && <p className="text-gray-500">Cargando cursos...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="lista-cursos">
          {misCursos.map(({ _id, course }) => (
            <div key={_id} className="curso-card">
              <div className="curso-info">
                <h4>{course.title}</h4>
                <p>
                  {course.category} · {course.level}
                </p>
              </div>
              <button
                className="btn-cancelar"
                onClick={() => confirmarCancelar(_id)}
              >
                Cancelar inscripción
              </button>
            </div>
          ))}
        </div>

        {!loading && misCursos.length === 0 && (
          <p className="mt-4 text-gray-500">
            Aún no estás inscrito en ningún curso.
          </p>
        )}
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>¿Estás seguro?</h4>
            <p>¿Querés cancelar tu inscripción a este curso?</p>
            <div className="modal-buttons">
              <button className="btn-cancelar" onClick={ejecutarCancelacion}>
                Sí, cancelar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setMostrarModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MisCursosAlumno;

