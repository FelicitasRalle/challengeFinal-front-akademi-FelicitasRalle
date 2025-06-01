import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL;

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    const res = await axios.post(`${API_URL}/auth/login`, credentials);

    const { token } = res.data;
    const user = jwtDecode(token); // ← forma correcta

    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user, token },
    });

  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response?.data?.message || 'Error al iniciar sesión',
    });
  }
};



