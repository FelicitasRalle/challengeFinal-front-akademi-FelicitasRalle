import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getCursos = () => async (dispatch) => {
  dispatch({ type: 'CURSOS_REQUEST' });

  try {
    const res = await axios.get(`${API_URL}/cursos`);
    dispatch({ type: 'CURSOS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({
      type: 'CURSOS_FAILURE',
      payload: error.response?.data?.message || 'Error al cargar cursos',
    });
  }
};
