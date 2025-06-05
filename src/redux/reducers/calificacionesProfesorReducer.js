const initialState = {
  alumnos: [],
  loading: false,
  notas: {},
  trimestres: {},
  notaIds: {},
};

const calificacionesProfesorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CALIFICACIONES_REQUEST":
      return { ...state, loading: true };
    case "CALIFICACIONES_SUCCESS":
      return {
        ...state,
        loading: false,
        alumnos: action.payload.alumnos,
        notas: action.payload.notas,
        trimestres: action.payload.trimestres,
        notaIds: action.payload.notaIds,
      };
    case "CALIFICACIONES_FAILURE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default calificacionesProfesorReducer;


