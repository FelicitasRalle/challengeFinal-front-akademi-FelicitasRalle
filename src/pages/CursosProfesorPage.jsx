import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCursosProfesor, eliminarCursoProfesor } from "../redux/actions/cursosProfesorActions";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CrearCursoModal from "../components/CrearCursoModal";
import NavbarProfesor from "../components/NavBarProfesor";
import CursoDetalleModal from "../components/CursoDetalleModal";
import "../styles/cursosProfesor.css";

const CursosProfesorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cursos } = useSelector((state) => state.cursosProfesor);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  const [cursoAEliminar, setCursoAEliminar] = useState(null);
  const [mostrarConfirmarEliminar, setMostrarConfirmarEliminar] = useState(false);

  const [errorEliminar, setErrorEliminar] = useState("");
  const [mostrarErrorModal, setMostrarErrorModal] = useState(false);

  useEffect(() => {
    dispatch(getCursosProfesor());
  }, [dispatch]);

  const handleEliminarCurso = async () => {
    try {
      await dispatch(eliminarCursoProfesor(cursoAEliminar));
      setMostrarConfirmarEliminar(false);
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorEliminar(error.response.data.message);
      } else {
        setErrorEliminar("Error al eliminar el curso.");
      }
      setMostrarErrorModal(true);
      setMostrarConfirmarEliminar(false);
    }
  };

  return (
    <>
      <NavbarProfesor />
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Mis Cursos</h2>
          <Button className="btn btn-crear" onClick={() => setMostrarModal(true)}>
            Crear Curso
          </Button>
        </div>
        <Row>
          {Array.isArray(cursos) &&
            cursos.map((curso) => (
              <Col md={4} key={curso._id} className="mb-4">
                <Card className="card-curso">
                  <Card.Body>
                    <Card.Title>{curso.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {curso.category} - {curso.level}
                    </Card.Subtitle>
                    <Card.Text>
                      Precio: ${curso.price} <br />
                      Cupos máximos: {curso.maxStudents}
                    </Card.Text>
                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        className="mt-2 btn-calificaciones"
                        onClick={() => navigate(`/profesor/calificaciones/${curso._id}`)}
                      >
                        Calificaciones
                      </Button>
                      <Button
                      className="btn btn-editar-prof"
                        onClick={() => setCursoSeleccionado(curso)}
                      >
                        Editar
                      </Button>
                      <Button
                      className="btn-eliminar-prof"
                        onClick={() => {
                          setCursoAEliminar(curso._id);
                          setMostrarConfirmarEliminar(true);
                        }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
      <CrearCursoModal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        onCursoCreado={() => dispatch(getCursosProfesor())}
      />
      {cursoSeleccionado && (
        <CursoDetalleModal
          curso={cursoSeleccionado}
          onHide={() => setCursoSeleccionado(null)}
          onActualizado={() => dispatch(getCursosProfesor())}
        />
      )}

      {/* Modal de confirmacion de eliminacion */}
      <Modal show={mostrarConfirmarEliminar} onHide={() => setMostrarConfirmarEliminar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que querés eliminar este curso? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarConfirmarEliminar(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminarCurso}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de error personalizado */}
      <Modal show={mostrarErrorModal} onHide={() => setMostrarErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>No se pudo eliminar el curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorEliminar}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CursosProfesorPage;


