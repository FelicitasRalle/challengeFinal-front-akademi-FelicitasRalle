import axios from 'axios';

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const res = await axios.post('http://localhost:3000/auth/login', credentials);
    const { token, user } = res.data;

    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response?.data?.message || 'Error al iniciar sesión',
    });
  }
};

