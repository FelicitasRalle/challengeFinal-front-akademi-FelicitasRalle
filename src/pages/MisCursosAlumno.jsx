import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMisCursos } from "../redux/actions/cursosAlumnoActions";
import NavBarAlumno from "../components/NavBarAlumno";

const MisCursosAlumno = () => {
  const dispatch = useDispatch();
  const {
    misCursos = [],
    loading,
    error,
  } = useSelector((state) => state.cursos);

  useEffect(() => {
    dispatch(getMisCursos());
  }, [dispatch]);

  console.log("Cursos inscritos:", misCursos);

  return (
    <>
      <NavBarAlumno />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Mis Cursos</h1>

        {loading && <p className="text-gray-500">Cargando cursos...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {misCursos.map(({ _id, course }) => (
            <div
              key={_id}
              className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {course.title}
              </h2>
              <p className="text-sm text-gray-500">
                {course.category} · {course.level}
              </p>
            </div>
          ))}
        </div>

        {!loading && misCursos.length === 0 && (
          <p className="mt-4 text-gray-500">
            Aún no estás inscrito en ningún curso.
          </p>
        )}
      </div>
    </>
  );
};

export default MisCursosAlumno;
