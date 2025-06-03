const initialState = {
  cursos: [],
};

export const cursosAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURSOS_ADMIN_SUCCESS":
      return {
        ...state,
        cursos: action.payload.courses,
      };
    default:
      return state;
  }
};

