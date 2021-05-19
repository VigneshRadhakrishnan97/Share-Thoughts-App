import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./type";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load user
export const loaduser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (er) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//regester
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loaduser());
  } catch (err) {
    const error = err.response.data.errors;

    if (error) {
      error.forEach((e) => {
        dispatch(setAlert(e.msg, "danger", 3000));
      });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};


//Login
export const login = ({  email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loaduser());
  } catch (err) {
    const error = err.response.data.errors;

    if (error) {
      error.forEach((e) => {
        dispatch(setAlert(e.msg, "danger", 3000));
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout / clear profile
export const  logout=()=>{

    return({
        type:LOGOUT
    });
}

// export const logout = () => (dispatch) => {
//   dispatch({
//     typr: LOGOUT,
//   });
// };