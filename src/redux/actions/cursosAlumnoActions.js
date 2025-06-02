import axios from 'axios';
import { toast } from 'react-toastify';

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

export const inscribirseCurso = (courseId) => async (dispatch, getState) => {
  try {
    const { auth: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`${API_URL}/enrollments`, { courseId }, config);

    dispatch({ type: 'INSCRIPCION_EXITOSA', payload: courseId });
    toast.success('Inscripción exitosa al curso');
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al inscribirse';
    dispatch({ type: 'INSCRIPCION_FALLIDA', payload: mensaje });
    toast.error(mensaje);
  }
};

