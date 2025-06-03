import axios from 'axios';

export const getUsuarios = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USUARIOS_REQUEST' });

    const { auth: { token } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get('/users?limit=100', config);
    dispatch({
      type: 'USUARIOS_SUCCESS',
      payload: data.users || [],
    });
  } catch (error) {
    dispatch({
      type: 'USUARIOS_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteUsuario = (id) => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    await axios.delete(`/users/${id}`, config);
    dispatch(getUsuarios());
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
};

export const updateUsuario = (id, formData) => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    await axios.put(`http://localhost:5000/users/${id}`, formData, config);

    dispatch(getUsuarios());
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
};

