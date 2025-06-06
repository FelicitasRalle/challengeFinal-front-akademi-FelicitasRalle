import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "../styles/superadmin.css";

const CrearUsuarioModal = ({ show, onHide, onUsuarioCreado }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    if (form.role === "professor") {
      payload.professorProfile = { department: form.department };
    }
    console.log("Payload enviado:", payload)

    try {
      await axios.post("http://localhost:5000/users", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUsuarioCreado(); // recargar usuarios en padre
      onHide();
    } catch (err) {
      console.error(
        "Error al crear usuario:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.message || "Hubo un error al crear el usuario");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Crear Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="firstName" onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control name="lastName" onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rol</Form.Label>
            <Form.Select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Alumno</option>
              <option value="professor">Profesor</option>
              <option value="superadmin">Superadmin</option>
            </Form.Select>
          </Form.Group>
          {form.role === "professor" && (
            <Form.Group>
              <Form.Label>Departamento</Form.Label>
              <Form.Control name="department" onChange={handleChange} />
            </Form.Group>
          )}
          <div className="mt-3 text-end">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button type="submit" className="ms-2 btn-crear">
              Crear
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CrearUsuarioModal;
