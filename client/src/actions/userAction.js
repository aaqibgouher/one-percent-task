import {
  addTodoApi,
  deleteTodoApi,
  editTodoApi,
  getMeApi,
  getStatsApi,
  getTodosApi,
  loginApi,
  logoutApi,
  registerApi,
} from "../api/userApi";
import {
  GET_ME,
  GET_STATS,
  GET_TODOS,
  SET_DIALOG,
  SET_SNACKBAR,
  SET_TOKEN,
} from "../types";

export const registerAction = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const res = await registerApi(payload);

    console.log(res, "from register action res");
    if (!res || res.status !== 200) throw res.error;

    // show success message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    return res;
  } catch (error) {
    console.log(error, "register action error");
    // show snackbar
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const loginAction = (payload) => async (dispatch) => {
  try {
    const res = await loginApi(payload);

    if (!res || res.status !== 200) throw res.error;

    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   set token to state & localstoray
    dispatch({ type: SET_TOKEN, payload: res.data.token });

    // save token to local storage
    localStorage.setItem("token", res.data.token);

    return res;
  } catch (error) {
    console.log(error, "from auth actions -> login user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    const res = await logoutApi();

    if (!res || res.status !== 200) throw res.error;

    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   remove token from state
    dispatch({ type: SET_TOKEN, payload: null });

    // save token to local storage
    localStorage.removeItem("token");

    // setting me to null
    dispatch({ type: GET_ME, payload: null });

    return res;
  } catch (error) {
    console.log(error, "from logout user action");
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: error },
    });
  }
};

export const getMeAction = () => async (dispatch) => {
  try {
    const res = await getMeApi();

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({ type: GET_ME, payload: res.data });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getStatsAction = () => async (dispatch) => {
  try {
    const res = await getStatsApi();

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({ type: GET_STATS, payload: res.data });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getTodosAction =
  (payload = {}) =>
  async (dispatch) => {
    try {
      const res = await getTodosApi(payload);

      if (!res || res.status !== 200) throw res.error;

      // show message
      dispatch({
        type: SET_SNACKBAR,
        payload: { open: true, message: res.message },
      });

      // update me state
      dispatch({ type: GET_TODOS, payload: res.data });
    } catch (error) {
      console.log(error, "from get me action user action");
      dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
    }
  };

export const addTodoAction = (payload) => async (dispatch) => {
  try {
    const res = await addTodoApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // refresh todos
    await dispatch(getTodosAction());

    // close model
    await dispatch({
      type: SET_DIALOG,
      payload: null,
    });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const deleteTodoAction = (payload) => async (dispatch) => {
  try {
    const res = await deleteTodoApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // refresh todos
    await dispatch(getTodosAction());
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const editTodoAction = (payload) => async (dispatch) => {
  try {
    const res = await editTodoApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // refresh todos
    await dispatch(getTodosAction());

    // close model
    await dispatch({
      type: SET_DIALOG,
      payload: null,
    });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};
