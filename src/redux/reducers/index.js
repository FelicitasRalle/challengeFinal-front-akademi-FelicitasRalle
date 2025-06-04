import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cursosAlumnosReducer from './cursosAlumnoReducer';
import { usuariosReducer } from './usuariosReducer';
import { cursosAdminReducer } from './cursosAdminReducer';
import { cursosProfesorReducer } from './cursosProfesorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cursos: cursosAlumnosReducer,
  usuarios: usuariosReducer,
  cursosAdmin: cursosAdminReducer,
  cursosProfesor: cursosProfesorReducer,
});

export default rootReducer;
