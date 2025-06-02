const initialState = {
  usuarios: [],
  loading: false,
  error: null,
};

export const usuariosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USUARIOS_REQUEST':
      return { ...state, loading: true };
    case 'USUARIOS_SUCCESS':
      return {
        ...state,
        loading: false,
        usuarios: Array.isArray(action.payload) ? action.payload : [],
      };
    case 'USUARIOS_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


