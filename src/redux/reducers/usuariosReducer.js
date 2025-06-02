const initialState = { usuarios: [], loading: false, error: null };
export const usuariosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USUARIOS_REQUEST':
      return { ...state, loading: true };
    case 'USUARIOS_SUCCESS':
      return { loading: false, usuarios: action.payload };
    case 'USUARIOS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
