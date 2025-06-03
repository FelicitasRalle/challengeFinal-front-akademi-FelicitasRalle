import axios from "axios";

export const getCursos = () => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const { data } = await axios.get("/courses", config);
    dispatch({ type: "CURSOS_ADMIN_SUCCESS", payload: data });
  } catch (error) {
    console.error("Error al obtener cursos:", error);
  }
};

