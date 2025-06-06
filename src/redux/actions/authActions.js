import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL;

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    const res = await axios.post(`${API_URL}/auth/login`, credentials);

    const { token } = res.data;
    const user = jwtDecode(token); 
    console.log("Usuario decodificado del token:", user);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
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

export const register = (formData) => async () => {
  try {
    await axios.post('/auth/register', formData);
  } catch (error) {
    throw error;
  }
};


