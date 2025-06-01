import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cursosAlumnosReducer from './cursosAlumnoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cursos: cursosAlumnosReducer,
});

export default rootReducer;
