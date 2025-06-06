// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import '../styles/login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user, justLoggedIn } = useSelector(
    (state) => state.auth
  );

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Email inválido';
    if (!formData.password.trim()) errors.password = 'La contraseña es obligatoria';
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    await dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated && user && justLoggedIn) {
      if (user.role === "student") navigate("/cursos");
      else if (user.role === "professor") navigate("/profesor/cursos");
      else if (user.role === "superadmin") navigate("/admin/usuarios");
    }
  }, [isAuthenticated, user, justLoggedIn, navigate]);

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
            {fieldErrors.email && <small className="text-danger">{fieldErrors.email}</small>}
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
            {fieldErrors.password && <small className="text-danger">{fieldErrors.password}</small>}
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
        <div className="mt-3 text-center">
          <span>¿No tenés cuenta? </span>
          <a href="/register" className="link-register-password">Registrate aquí</a>
        </div>
        <div className="mt-2 text-center">
          <a href="/forgot-password" className="link-register-password">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


