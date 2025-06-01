import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/navbarAlumno.css";

const NavbarAlumno = () => {
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
            <Nav.Link onClick={() => navigate("/cursos")}>Cursos</Nav.Link>
            <NavDropdown title="Mi cuenta">
              <NavDropdown.Item onClick={() => navigate("/mis-cursos")}>
                Mis Cursos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/calificaciones")}>
                Calificaciones
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarAlumno;
