// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import '../styles/login.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'El nombre es obligatorio';
    if (!formData.lastName.trim()) errors.lastName = 'El apellido es obligatorio';
    if (!formData.email.trim()) errors.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Email inválido';
    if (!formData.password.trim()) errors.password = 'La contraseña es obligatoria';
    else if (formData.password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await dispatch(register(formData));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h3 className="login-title">Registrarse</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input type="text" name="firstName" className="form-control" onChange={handleChange} />
            {fieldErrors.firstName && <small className="text-danger">{fieldErrors.firstName}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido:</label>
            <input type="text" name="lastName" className="form-control" onChange={handleChange} />
            {fieldErrors.lastName && <small className="text-danger">{fieldErrors.lastName}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} />
            {fieldErrors.email && <small className="text-danger">{fieldErrors.email}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} />
            {fieldErrors.password && <small className="text-danger">{fieldErrors.password}</small>}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn login-btn" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : 'Registrarse'}
            </button>
          </div>
          {error && (
            <Alert variant="danger" className="mt-3">{error}</Alert>
          )}
        </form>
        <div className="mt-3 text-center">
          <span>¿Ya tenés cuenta? </span>
          <a href="/">Iniciá sesión</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


