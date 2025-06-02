import axios from 'axios';

export const getUsuarios = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USUARIOS_REQUEST' });
    const { auth: { userInfo } } = getState();
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };
    console.log("Disparando GET /users con token:", userInfo.token);
    const { data } = await axios.get('/users', config);
    dispatch({ type: 'USUARIOS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'USUARIOS_FAIL', payload: error.response?.data?.message || error.message });
  }
};

export const updateUsuario = (id, usuario) => async (dispatch, getState) => {
  try {
    const { auth: { userInfo } } = getState();
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` },
    };
    await axios.put(`/users/${id}`, usuario, config);
    dispatch(getUsuarios());
  } catch (error) {
    console.error(error);
  }
};

export const deleteUsuario = (id) => async (dispatch, getState) => {
  try {
    const { auth: { userInfo } } = getState();
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };
    await axios.delete(`/users/${id}`, config);
    dispatch(getUsuarios());
  } catch (error) {
    console.error(error);
  }
};
