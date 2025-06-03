import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import NavbarSuperadmin from "../components/NavBarSuperadmin";
import { getCursos } from "../redux/actions/cursosAdminActions";
import '../styles/superadmin.css';

const CursosAdminPage = () => {
  const dispatch = useDispatch();
  const { cursos } = useSelector((state) => state.cursosAdmin);

  const [showModal, setShowModal] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);

  useEffect(() => {
    dispatch(getCursos());
  }, [dispatch]);

  return (
    <>
      <NavbarSuperadmin />
      <div className="p-4">
        <h2 className="mb-4 text-center">Cursos</h2>
        <Row>
          {Array.isArray(cursos) && cursos.map((curso) => (
            <Col md={4} key={curso._id} className="mb-4">
              <Card className="card-curso">
                <Card.Body>
                  <Card.Title>{curso.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {curso.category} - {curso.level}
                  </Card.Subtitle>
                  <Card.Text>
                    Profesor: {curso.professor?.firstName || "-"} <br />
                    Precio: ${curso.price} <br />
                    Cupos máximos: {curso.maxStudents}
                  </Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button
                      className="btn-mas"
                      onClick={() => {
                        setSelectedCurso(curso);
                        setShowModal(true);
                      }}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCurso?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Descripción:</strong> {selectedCurso?.description}</p>
          <p><strong>Precio:</strong> ${selectedCurso?.price}</p>
          <p><strong>Nivel:</strong> {selectedCurso?.level}</p>
          <p><strong>Categoría:</strong> {selectedCurso?.category}</p>
          <p><strong>Cupos:</strong> {selectedCurso?.maxStudents}</p>
          <p><strong>Profesor:</strong> {selectedCurso?.professor?.firstName}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CursosAdminPage;
