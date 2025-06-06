import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getCursosProfesor } from "../redux/actions/cursosProfesorActions";

const CursoDetalleModal = ({ curso, onHide, onActualizado }) => {
  const dispatch = useDispatch();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ ...curso });
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      await axios.put(`/courses/${curso._id}`, form);
      setEditando(false);
      onActualizado();
    } catch (error) {
      console.error("Error al actualizar curso:", error);
    }
  };

  return (
    <>
      {!mostrarConfirmacion && (
        <Modal show onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle del Curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  readOnly={!editando}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  readOnly={!editando}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  readOnly={!editando}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  readOnly={!editando}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nivel</Form.Label>
                <Form.Control
                  as="select"
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  disabled={!editando}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Cupos Máximos</Form.Label>
                <Form.Control
                  type="number"
                  name="maxStudents"
                  value={form.maxStudents}
                  onChange={handleChange}
                  readOnly={!editando}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {editando ? (
              <Button variant="success" onClick={handleGuardar}>
                Guardar cambios
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setEditando(true)}>
                Editar
              </Button>
            )}
            <Button variant="secondary" onClick={onHide}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </>
  );
};

export default CursoDetalleModal;

