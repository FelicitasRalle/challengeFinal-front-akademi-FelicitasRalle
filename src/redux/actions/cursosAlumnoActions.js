import axios from "axios";
import { toast } from "react-toastify";

export const getCursos = () => async (dispatch) => {
  dispatch({ type: "CURSOS_REQUEST" });

  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "CURSOS_SUCCESS", payload: res.data.courses });
  } catch (error) {
    dispatch({
      type: "CURSOS_FAILURE",
      payload: error.response?.data?.message || "Error al cargar cursos",
    });
  }
};

export const inscribirseCurso = (courseId) => async (dispatch, getState) => {
  console.log("Inscribiendo al curso con ID:", courseId);
  try {
    const {
      auth: { user, token },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post("/enrollments", { courseId }, config);

    dispatch({ type: "INSCRIPCION_EXITOSA", payload: courseId });
    toast.success("Inscripción exitosa al curso");
  } catch (error) {
    console.error("Error al inscribirse:", error.response?.data || error);
    const mensaje = error.response?.data?.message || "Error al inscribirse";
    dispatch({ type: "INSCRIPCION_FALLIDA", payload: mensaje });
    toast.error(mensaje);
  }
};

export const getMisCursos = () => async (dispatch, getState) => {
  const {
    auth: { user, token },
  } = getState();

  if (!token || !user?.id) {
    return dispatch({
      type: "MIS_CURSOS_FAILURE",
      payload: "Usuario no autenticado",
    });
  }

  try {
    dispatch({ type: "MIS_CURSOS_REQUEST" });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`/enrollments/student/${user.id}`, config);
    dispatch({ type: "MIS_CURSOS_SUCCESS", payload: res.data.enrollments });
  } catch (error) {
    dispatch({
      type: "MIS_CURSOS_FAILURE",
      payload:
        error.response?.data?.message || "Error al cargar tus cursos",
    });
  }
};

export const cancelarInscripcion = (inscripcionId) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`/enrollments/${inscripcionId}`, config);

    dispatch(getMisCursos()); // Actualiza la lista tras eliminar
    toast.success("Inscripción cancelada con éxito");
  } catch (error) {
    toast.error("No se pudo cancelar la inscripción");
    console.error("Error al cancelar inscripción:", error.response?.data || error);
  }
};



