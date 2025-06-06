import axios from 'axios';

export const fetchStudentGrades = (studentId) => async (dispatch) => {
  try {
    dispatch({ type: 'CALIFICACIONES_ALUMNO_REQUEST' });

    const token = localStorage.getItem('token');

    const res = await axios.get(`/grades/student/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'CALIFICACIONES_ALUMNO_SUCCESS',
      payload: res.data.grades,
    });
  } catch (error) {
    dispatch({
      type: 'CALIFICACIONES_ALUMNO_FAILURE',
      payload: error.response?.data?.message || error.message,
    });
  }
};


