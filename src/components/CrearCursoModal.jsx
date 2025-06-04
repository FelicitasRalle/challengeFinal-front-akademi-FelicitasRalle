import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { crearCursoProfesor } from "../redux/actions/cursosProfesorActions";

const CrearCursoModal = ({ show, onHide, onCursoCreado }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    level: "beginner",
    category: "",
    maxStudents: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(crearCursoProfesor({
      ...form,
      price: Number(form.price),
      maxStudents: Number(form.maxStudents),
    }));
    onHide();
    onCursoCreado();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Curso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLevel">
            <Form.Label>Nivel</Form.Label>
            <Form.Control
              as="select"
              name="level"
              value={form.level}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMaxStudents">
            <Form.Label>Cupos Máximos</Form.Label>
            <Form.Control
              type="number"
              name="maxStudents"
              value={form.maxStudents}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Crear
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CrearCursoModal;
