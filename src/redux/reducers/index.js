import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cursosAlumnoReducer from './cursosAlumnoReducer';
import { usuariosReducer } from './usuariosReducer';
import { cursosAdminReducer } from './cursosAdminReducer';
import { cursosProfesorReducer } from './cursosProfesorReducer';
import calificacionesProfesorReducer from "./calificacionesProfesorReducer";
import calificacionesAlumnoReducer from './calificacionesAlumnoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cursos: cursosAlumnoReducer,
  usuarios: usuariosReducer,
  cursosAdmin: cursosAdminReducer,
  cursosProfesor: cursosProfesorReducer,
  calificaciones: calificacionesProfesorReducer,
  calificacionesAlumno: calificacionesAlumnoReducer
});

export default rootReducer;
