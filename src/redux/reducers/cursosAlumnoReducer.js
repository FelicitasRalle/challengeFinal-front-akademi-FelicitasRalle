const initialState = {
  cursos: [],
  misCursos: [],
  loading: false,
  error: null,
};

const cursosAlumnoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURSOS_REQUEST":
      return { ...state, loading: true };
    case "CURSOS_SUCCESS":
      return { ...state, loading: false, cursos: action.payload };
    case "CURSOS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "INSCRIPCION_EXITOSA":
      return {
        ...state,
        cursos: state.cursos.map((c) =>
          c._id === action.payload ? { ...c, enrolled: true } : c
        ),
      };
    case "INSCRIPCION_FALLIDA":
      return { ...state, error: action.payload };
    case "MIS_CURSOS_REQUEST":
      return { ...state, loading: true };
    case "MIS_CURSOS_SUCCESS":
      return { ...state, loading: false, misCursos: action.payload };
    case "MIS_CURSOS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default cursosAlumnoReducer;
