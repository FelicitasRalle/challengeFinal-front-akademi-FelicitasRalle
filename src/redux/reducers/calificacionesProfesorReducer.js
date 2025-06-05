const initialState = {
  alumnos: [],
  loading: false,
};

const calificacionesProfesorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CALIFICACIONES_REQUEST":
      return { ...state, loading: true };
    case "CALIFICACIONES_SUCCESS":
      return { ...state, loading: false, alumnos: action.payload };
    case "CALIFICACIONES_FAILURE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default calificacionesProfesorReducer;

