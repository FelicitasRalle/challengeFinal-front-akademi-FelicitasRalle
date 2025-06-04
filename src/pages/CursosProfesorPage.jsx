import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCursosProfesor } from "../redux/actions/cursosProfesorActions";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CrearCursoModal from "../components/CrearCursoModal";
import NavbarProfesor from "../components/NavBarProfesor";
import "../styles/cursosProfesor.css";

const CursosProfesorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cursos } = useSelector((state) => state.cursosProfesor);

  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    dispatch(getCursosProfesor());
  }, [dispatch]);

  useEffect(() => {
  console.log("Cursos recibidos:", cursos);
}, [cursos]);

  return (
    <>
      <NavbarProfesor />
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Mis Cursos</h2>
          <Button variant="primary" onClick={() => setMostrarModal(true)}>
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
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="outline-primary"
                        onClick={() => navigate(`/profesor/alumnos/${curso._id}`)}
                      >
                        Ver más
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
    </>
  );
};

export default CursosProfesorPage;
