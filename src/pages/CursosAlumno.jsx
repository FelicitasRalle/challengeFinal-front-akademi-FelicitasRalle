import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCursos } from '../redux/actions/cursosAlumnoActions';
import { Spinner, Modal, Button } from 'react-bootstrap';
import NavbarAlumno from '../components/NavBarAlumno';
import '../styles/cursosAlumno.css';

const CursosAlumnoPage = () => {
  const dispatch = useDispatch();
  const { cursos, loading } = useSelector((state) => state.cursos);
  const [showModal, setShowModal] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  useEffect(() => {
    dispatch(getCursos());
  }, [dispatch]);

  const handleVerMas = (curso) => {
    setCursoSeleccionado(curso);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setCursoSeleccionado(null);
  };

  const handleInscribirse = (cursoId) => {
    // Aquí va la lógica para inscribirse en el curso
    setShowModal(false);
    setCursoSeleccionado(null);
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
                    src={curso.imagen || 'https://via.placeholder.com/300x150?text=Curso'}
                    className="card-img-top"
                    alt={curso.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{curso.title}</h5>
                    <p className="card-text">{curso.description}</p>
                    <button className="btn btn-vermas w-100" onClick={() => handleVerMas(curso)}>Ver más</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cursoSeleccionado && (
          <Modal show={showModal} onHide={handleCerrarModal}>
            <Modal.Header closeButton>
              <Modal.Title>{cursoSeleccionado.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Descripción:</strong> {cursoSeleccionado.description}</p>
              <p><strong>Categoría:</strong> {cursoSeleccionado.category}</p>
              <p><strong>Nivel:</strong> {cursoSeleccionado.level}</p>
              <p><strong>Precio:</strong> ${cursoSeleccionado.price}</p>
              <p><strong>Profesor:</strong> {cursoSeleccionado.professor?.firstName} {cursoSeleccionado.professor?.lastName}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCerrarModal}>Cerrar</Button>
              <Button variant="primary" onClick={() => handleInscribirse(cursoSeleccionado._id)}>Inscribirse</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </>
  );
};

export default CursosAlumnoPage;
