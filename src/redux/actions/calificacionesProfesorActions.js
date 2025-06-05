import axios from "axios";

export const getAlumnosCurso = (courseId) => async (dispatch, getState) => {
  dispatch({ type: "CALIFICACIONES_REQUEST" });
  const { token } = getState().auth;

  try {
    const res = await axios.get(`/enrollments/course/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const alumnos = res.data.enrollments.map(e => e.student); // asumiendo que viene populado
    dispatch({ type: "CALIFICACIONES_SUCCESS", payload: alumnos });
  } catch (error) {
    dispatch({ type: "CALIFICACIONES_FAILURE" });
  }
};

export const cargarNota = ({ studentId, courseId, value }) => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    await axios.post(`/grades`, { studentId, courseId, value }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error("Error al cargar nota:", err.response?.data || err);
  }
};
