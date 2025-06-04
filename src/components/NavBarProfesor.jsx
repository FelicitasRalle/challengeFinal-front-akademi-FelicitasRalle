import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/navbarAdmin.css";

const NavbarProfesor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Navbar expand="lg" className="navbar-akademi">
      <Container>
        <Navbar.Brand className="navbar-brand-akademi">Akademi</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate("/profesor/cursos")}>Mis Cursos</Nav.Link>
            <Nav.Link onClick={() => navigate("/profesor/alumnos")}>Alumnos</Nav.Link>
            <Nav.Link onClick={() => navigate("/profesor/notas")}>Notas</Nav.Link>
            <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarProfesor;
