import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cursosAlumnosReducer from './cursosAlumnoReducer';
import { usuariosReducer } from './usuariosReducer';
import { cursosAdminReducer } from './cursosAdminReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cursos: cursosAlumnosReducer,
  usuarios: usuariosReducer,
  cursosAdmin: cursosAdminReducer,
});

export default rootReducer;
