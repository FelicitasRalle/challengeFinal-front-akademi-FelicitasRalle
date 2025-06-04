import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import '../styles/login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("Redirigiendo por rol:", user.role);
      if (user.role === "student") navigate("/cursos");
      else if (user.role === "professor") navigate("/cursosProfesor");
      else if (user.role === "superadmin") navigate("/admin/usuarios");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="login-page">
      <div className="login-card">
        <h3 className="login-title">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn login-btn" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Ingresar"}
            </button>
          </div>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
