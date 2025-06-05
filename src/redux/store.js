import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';;
import rootReducer from './reducers';

//cargar datos desde localStorage
const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const tokenFromStorage = localStorage.getItem('token') || null;

const initialState = {
  auth: {
    user: userFromStorage,
    token: tokenFromStorage,
    isAuthenticated: !!userFromStorage,
    loading: false,
    error: null,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;

