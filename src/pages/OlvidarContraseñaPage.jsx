import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import '../styles/login.css';

const OlvidarContraseñaPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await axios.post('/auth/forgot-password', { email });
      setMessage('Se envió un enlace para restablecer la contraseña');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el correo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h3 className="login-title">Recuperar contraseña</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn login-btn" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : 'Enviar enlace'}
            </button>
          </div>
          {message && <Alert variant="success" className="mt-3">{message}</Alert>}
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </form>
        <div className="mt-3 text-center">
          <a href="/">Volver al inicio</a>
        </div>
      </div>
    </div>
  );
};

export default OlvidarContraseñaPage;
