const initialState = {
  cursos: [],
};

export const cursosProfesorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURSOS_PROFESOR_SUCCESS":
      return {
        ...state,
        cursos: action.payload,
      };
    default:
      return state;
  }
};
