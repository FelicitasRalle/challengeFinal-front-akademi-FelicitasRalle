import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(formData));
  };

  //llevo a la pagina principal luego de loguearse
  if (isAuthenticated && user) {
    if (user.role === 'alumno') navigate('/cursos');
    else if (user.role === 'profesor') navigate('/mis-cursos');
    else if (user.role === 'superadmin') navigate('/admin/usuarios');
  }

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Contraseña:</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : 'Ingresar'}
        </button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </form>
    </div>
  );
};

export default LoginPage;
