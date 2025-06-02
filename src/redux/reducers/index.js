import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cursosAlumnosReducer from './cursosAlumnoReducer';
import { usuariosReducer } from './usuariosReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cursos: cursosAlumnosReducer,
  usuarios: usuariosReducer,
});

export default rootReducer;
