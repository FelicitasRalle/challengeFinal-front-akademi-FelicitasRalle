import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCursos } from '../redux/actions/cursosAlumnoActions';
import { Spinner } from 'react-bootstrap';
import NavbarAlumno from '../components/NavBarAlumno';
import '../styles/cursosAlumno.css';

const CursosAlumnoPage = () => {
  const dispatch = useDispatch();
  const { cursos, loading } = useSelector((state) => state.cursos);

  useEffect(() => {
    dispatch(getCursos());
  }, [dispatch]);

  return (
    <>
      <NavbarAlumno />
      <div className="cursos-container">
        <h2 className="cursos-title">Todos los Cursos</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : Array.isArray(cursos) ? (
          <div className="row">
            {cursos.map((curso) => (
              <div className="col-md-4 mb-4" key={curso._id}>
                <div className="card curso-card h-100">
                  <img
                    src={'https://via.placeholder.com/300x150?text=Curso'}
                    className="card-img-top"
                    alt={curso.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{curso.title}</h5>
                    <p className="card-text">{curso.description}</p>
                    <button className="btn btn-vermas w-100">Ver más</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No se pudieron cargar los cursos.</p>
        )}
      </div>
    </>
  );
};

export default CursosAlumnoPage;


