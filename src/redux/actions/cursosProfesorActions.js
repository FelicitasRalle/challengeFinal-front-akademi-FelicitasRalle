import axios from "axios";

export const getCursosProfesor = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const { token, user } = auth;

    const userId = user?._id || user?.id;
    if (!userId) {
      console.error("No se pudo obtener el ID del profesor");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`/courses/professor/${userId}`, config);
    dispatch({ type: "CURSOS_PROFESOR_SUCCESS", payload: data });
  } catch (error) {
    console.error("Error al obtener cursos del profesor:", error);
  }
};

export const crearCursoProfesor = (nuevoCurso) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const { token } = auth;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/courses", nuevoCurso, config);

    dispatch({ type: "CREAR_CURSO_PROFESOR_SUCCESS", payload: data });
    dispatch(getCursosProfesor()); // refresca la lista de cursos
  } catch (error) {
    console.error("Error al crear curso:", error);
  }
};