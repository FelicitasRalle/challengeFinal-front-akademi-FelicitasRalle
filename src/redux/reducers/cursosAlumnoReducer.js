const initialState = {
  cursos: [],
  loading: false,
  error: null,
};

const cursoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CURSOS_REQUEST':
      return { ...state, loading: true };
    case 'CURSOS_SUCCESS':
      return { ...state, loading: false, cursos: action.payload };
    case 'CURSOS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default cursoReducer;
