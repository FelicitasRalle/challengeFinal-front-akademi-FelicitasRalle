import axios from "axios";

export const getAlumnosCurso = (courseId) => async (dispatch, getState) => {
  dispatch({ type: "CALIFICACIONES_REQUEST" });
  const { token } = getState().auth;

  try {
    const resEnroll = await axios.get(`/enrollments/course/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const alumnos = resEnroll.data.enrollments.map((e) => e.student);

    const resGrades = await axios.get(`/grades/course/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const notas = {},
      trimestres = {},
      notaIds = {};
    resGrades.data.forEach((nota) => {
      notas[nota.student._id] = nota.value;
      trimestres[nota.student._id] = nota.trimester;
      notaIds[nota.student._id] = nota._id;
    });

    dispatch({
      type: "CALIFICACIONES_SUCCESS",
      payload: { alumnos, notas, trimestres, notaIds },
    });
  } catch (error) {
    dispatch({ type: "CALIFICACIONES_FAILURE" });
  }
};

export const cargarNota =
  ({ studentId, courseId, value, trimester, notaId }) =>
  async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const body = { studentId, courseId, value, trimester };

      if (notaId) {
        await axios.put(`/grades/${notaId}`, { value, trimester }, config);
      } else {
        await axios.post(`/grades`, body, config);
      }
    } catch (err) {
      console.error("Error al cargar nota:", err.response?.data || err);
    }
  };

export const eliminarNota = (notaId) => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    await axios.delete(`/grades/${notaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error("Error al eliminar nota:", err.response?.data || err);
  }
};
