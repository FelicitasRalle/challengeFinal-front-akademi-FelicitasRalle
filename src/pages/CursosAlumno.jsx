import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCursos } from '../redux/actions/cursosAlumnoActions';
import { Spinner } from 'react-bootstrap';

const CursosPage = () => {
  const dispatch = useDispatch();
  const { cursos, loading } = useSelector((state) => state.cursos);

  useEffect(() => {
    dispatch(getCursos());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ color: '#003B73' }}>Todos los Cursos</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="row">
          {cursos.map((curso) => (
            <div className="col-md-4 mb-4" key={curso._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={curso.imagen || 'https://via.placeholder.com/300x150?text=Curso'}
                  className="card-img-top"
                  alt={curso.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{curso.nombre}</h5>
                  <p className="card-text">{curso.descripcion}</p>
                  <button className="btn btn-primary w-100">Ver más</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CursosPage;
