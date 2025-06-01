import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getCursos = () => async (dispatch) => {
  dispatch({ type: 'CURSOS_REQUEST' });

  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'CURSOS_SUCCESS', payload: res.data.courses });
  } catch (error) {
    dispatch({
      type: 'CURSOS_FAILURE',
      payload: error.response?.data?.message || 'Error al cargar cursos',
    });
  }
};

