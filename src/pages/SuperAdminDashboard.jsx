import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsuarios,
  updateUsuario,
  deleteUsuario,
} from "../redux/actions/usuariosActions";
import "../styles/superadmin.css";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import NavbarSuperadmin from "../components/NavBarSuperadmin";
import CrearUsuarioModal from "../components/CrearUsuarioModal";
import ConfirmarEliminarModal from "../components/ConfirmarEliminarModal";
import { Modal, Button } from "react-bootstrap";

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const { usuarios, loading } = useSelector((state) => state.usuarios);

  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  const [errorEliminar, setErrorEliminar] = useState("");
  const [mostrarErrorModal, setMostrarErrorModal] = useState(false);

  useEffect(() => {
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

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUsuario(id));
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorEliminar(error.response.data.message);
        setMostrarErrorModal(true);
      } else {
        setErrorEliminar("Error al eliminar usuario.");
        setMostrarErrorModal(true);
        console.error(error);
      }
    }
  };

  return (
    <>
      <NavbarSuperadmin />
      <div className="table-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Usuarios</h2>
          <button className="btn-crear btn" onClick={() => setMostrarModal(true)}>
            Crear Usuario
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="table table-bordered custom-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(usuarios) &&
                usuarios.map((u) => (
                  <tr key={u._id} className="border-t">
                    <td className="p-2">
                      {editando === u._id ? (
                        <input
                          value={form.firstName}
                          onChange={(e) =>
                            setForm({ ...form, firstName: e.target.value })
                          }
                        />
                      ) : (
                        u.firstName
                      )}
                    </td>
                    <td className="p-2">
                      {editando === u._id ? (
                        <input
                          value={form.lastName}
                          onChange={(e) =>
                            setForm({ ...form, lastName: e.target.value })
                          }
                        />
                      ) : (
                        u.lastName
                      )}
                    </td>
                    <td className="p-2">
                      {editando === u._id ? (
                        <input
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                        />
                      ) : (
                        u.email
                      )}
                    </td>
                    <td className="p-2">
                      {editando === u._id ? (
                        <select
                          value={form.role}
                          onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                          }
                        >
                          <option value="student">student</option>
                          <option value="professor">professor</option>
                          <option value="superadmin">superadmin</option>
                        </select>
                      ) : (
                        u.role
                      )}
                    </td>
                    <td>
                      {editando === u._id ? (
                        <button
                          onClick={handleSave}
                          className="btn-icon text-success"
                          title="Guardar"
                        >
                          <FaSave />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(u)}
                          className="btn-icon text-primary"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setUsuarioAEliminar(u._id);
                          setMostrarConfirmacion(true);
                        }}
                        className="btn-icon text-danger ms-2"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <CrearUsuarioModal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        onUsuarioCreado={() => dispatch(getUsuarios())}
      />
      <ConfirmarEliminarModal
        show={mostrarConfirmacion}
        onHide={() => setMostrarConfirmacion(false)}
        onConfirm={async () => {
          await handleDelete(usuarioAEliminar);
          setMostrarConfirmacion(false);
        }}
      />

      {/* Modal de error personalizado */}
      <Modal show={mostrarErrorModal} onHide={() => setMostrarErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>No se pudo eliminar el usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorEliminar}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SuperAdminDashboard;


