import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentGrades } from '../redux/actions/calificacionesAlumnoActions';
import NavbarAlumno from '../components/NavBarAlumno';

const CalificacionesAlumnoPage = () => {
  const dispatch = useDispatch();
  const { notas, loading, error } = useSelector((state) => state.calificacionesAlumno);
  const studentId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentGrades(studentId));
    }
  }, [dispatch, studentId]);

  if (loading) return <p>Cargando calificaciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <NavbarAlumno />
      <div className="container mt-4">
        <h2>Mis Calificaciones</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Trimestre</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((g) => (
              <tr key={g._id}>
                <td>{g.course.title}</td>
                <td>{g.trimester}</td>
                <td>{g.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalificacionesAlumnoPage;


