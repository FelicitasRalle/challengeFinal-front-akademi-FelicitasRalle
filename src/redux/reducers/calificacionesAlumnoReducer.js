const initialState = {
  notas: [],
  loading: false,
  error: null,
};

const calificacionesAlumnoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CALIFICACIONES_ALUMNO_REQUEST':
      return { ...state, loading: true, error: null };
    case 'CALIFICACIONES_ALUMNO_SUCCESS':
      return { ...state, loading: false, notas: action.payload };
    case 'CALIFICACIONES_ALUMNO_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default calificacionesAlumnoReducer;