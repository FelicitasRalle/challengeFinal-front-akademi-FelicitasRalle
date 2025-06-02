import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsuarios, updateUsuario, deleteUsuario } from '../redux/actions/usuariosActions';

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const { usuarios, loading } = useSelector((state) => state.usuarios);
  console.log("Usuarios en Redux:", usuarios);

  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', role: '' });

  useEffect(() => {
     console.log("Ejecutando useEffect");
    dispatch(getUsuarios());
  }, [dispatch]);

  const handleEdit = (usuario) => {
    setEditando(usuario._id);
    setForm({ ...usuario });
  };

  const handleSave = () => {
    dispatch(updateUsuario(editando, form));
    setEditando(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar usuario?')) dispatch(deleteUsuario(id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>
      {loading ? <p>Cargando...</p> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellido</th>
              <th className="p-2">Email</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usuarios) && usuarios.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-2">
                  {editando === u._id ? <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /> : u.firstName}
                </td>
                <td className="p-2">
                  {editando === u._id ? <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /> : u.lastName}
                </td>
                <td className="p-2">
                  {editando === u._id ? <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /> : u.email}
                </td>
                <td className="p-2">
                  {editando === u._id ? (
                    <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                      <option value="student">student</option>
                      <option value="professor">professor</option>
                      <option value="superadmin">superadmin</option>
                    </select>
                  ) : u.role}
                </td>
                <td className="p-2">
                  {editando === u._id ? (
                    <button onClick={handleSave} className="text-green-600">Guardar</button>
                  ) : (
                    <button onClick={() => handleEdit(u)} className="text-blue-600">Editar</button>
                  )}
                  <button onClick={() => handleDelete(u._id)} className="ml-2 text-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
