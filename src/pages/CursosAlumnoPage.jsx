import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCursos,
  inscribirseCurso,
  getMisCursos,
} from "../redux/actions/cursosAlumnoActions";
import { Spinner } from "react-bootstrap";
import NavbarAlumno from "../components/NavBarAlumno";
import "../styles/cursosAlumno.css";

const CursosAlumnoPage = () => {
  const dispatch = useDispatch();
  const { cursos, loading } = useSelector((state) => state.cursos);
  const [showModal, setShowModal] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const { misCursos } = useSelector((state) => state.cursos);

  const yaInscripto = misCursos?.some(
    (c) => c.course?._id === cursoSeleccionado?._id
  );

  useEffect(() => {
    dispatch(getCursos());
    dispatch(getMisCursos());
  }, [dispatch]);

  const handleVerMas = (curso) => {
    setCursoSeleccionado(curso);
    setMensaje(null);
    setShowModal(true);
  };

  const handleInscripcion = async () => {
    try {
      await dispatch(inscribirseCurso(cursoSeleccionado._id));
      await dispatch(getCursos()); // actualiza el catálogo
      await dispatch(getMisCursos()); // actualiza los cursos del alumno
      setMensaje("Inscripción exitosa");
    } catch {
      setMensaje("No se pudo realizar la inscripción");
    }
  };

  return (
    <>
      <NavbarAlumno />
      <div className="cursos-container">
        <h2 className="cursos-title">Todos los Cursos</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="row">
            {cursos.map((curso) => (
              <div className="col-md-4 mb-4" key={curso._id}>
                <div className="card curso-card h-100">
                  <img
                    src={
                      curso.imagen ||
                      "https://via.placeholder.com/300x150?text=Curso"
                    }
                    className="card-img-top"
                    alt={curso.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{curso.title}</h5>
                    <p className="card-text">{curso.description}</p>
                    <button
                      className="btn btn-vermas w-100"
                      onClick={() => handleVerMas(curso)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && cursoSeleccionado && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{cursoSeleccionado.title}</h3>
            <p>{cursoSeleccionado.description}</p>
            <p>
              <strong>Categoría:</strong> {cursoSeleccionado.category}
            </p>
            <p>
              <strong>Precio:</strong> ${cursoSeleccionado.price}
            </p>
            <p>
              <strong>Nivel:</strong> {cursoSeleccionado.level}
            </p>
            <p>
              <strong>Profesor:</strong>{" "}
              {cursoSeleccionado.professor?.firstName}{" "}
              {cursoSeleccionado.professor?.lastName}
            </p>
            {mensaje && <p className="mensaje-inscripcion">{mensaje}</p>}
            <div className="modal-buttons">
              {yaInscripto ? (
                <p className="mensaje-inscripcion">
                  Ya estás inscrito en este curso
                </p>
              ) : (
                <button className="btn-inscribirse" onClick={handleInscripcion}>
                  Inscribirse
                </button>
              )}
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CursosAlumnoPage;
