const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  token: localStorage.getItem("token") || null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
