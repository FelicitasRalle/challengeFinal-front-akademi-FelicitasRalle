import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/navbarAdmin.css";

const NavbarSuperadmin = () => {
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
            <Nav.Link onClick={() => navigate("/admin/usuarios")}>Usuarios</Nav.Link>
            <Nav.Link onClick={() => navigate("/cursosAdmin")}>Cursos</Nav.Link>
            <Nav.Link onClick={() => navigate("/calificaciones")}>Calificaciones</Nav.Link>
            <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSuperadmin;
