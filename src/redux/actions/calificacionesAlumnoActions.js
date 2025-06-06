import axios from 'axios';

export const fetchStudentGrades = (studentId) => async (dispatch) => {
  try {
    dispatch({ type: 'CALIFICACIONES_ALUMNO_REQUEST' });

    const res = await axios.get(`/api/grades/student/${studentId}`);

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
