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
  console.log("Inscribiendo al curso con ID:", courseId);
  try {
    const { auth: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
console.log("URL a la que se hace POST:", `${API_URL}/enrollments`);
    await axios.post(`${API_URL}/enrollments`, { courseId }, config);

    dispatch({ type: 'INSCRIPCION_EXITOSA', payload: courseId });
    toast.success('Inscripción exitosa al curso');
  } catch (error) {
    console.log("POST enviado correctamente");
    const mensaje = error.response?.data?.message || 'Error al inscribirse';
    dispatch({ type: 'INSCRIPCION_FALLIDA', payload: mensaje });
    toast.error(mensaje);
  }
};

export const getMisCursos = () => async (dispatch, getState) => {
  const { auth: { userInfo } } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    dispatch({ type: 'MIS_CURSOS_REQUEST' });
    const res = await axios.get(`${API_URL}/enrollments/${userInfo._id}`, config);
    dispatch({ type: 'MIS_CURSOS_SUCCESS', payload: res.data.enrollments });
  } catch (error) {
    dispatch({
      type: 'MIS_CURSOS_FAILURE',
      payload: error.response?.data?.message || 'Error al cargar tus cursos',
    });
  }
};
