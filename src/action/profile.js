import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  LOGOUT,
  CLEAR_PROFILES,
  GET_REPOS
} from "./type";
import setAuthToken from "../utils/setAuthToken";

//get current user profile

export const getCurrentProfile = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};


//GET all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type:CLEAR_PROFILES
  });
  try {
    const res = await axios.get("api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//GET  profile by ID
export const getProfilebyID = (userID) => async (dispatch) => {
  
  try {
    const res = await axios.get(`/api/profile/user/${userID}`);
    
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};


//GET git hub repos
export const getRepos = (username) => async (dispatch) => {
  
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};
//create or update profile

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("api/profile", body, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Profile updated" : "profile created", "success"));
    if (!edit) history.push("/dashboard");
  } catch (err) {
    const error = err.response.data.errors;

    if (error) {
      error.forEach((e) => {
        dispatch(setAlert(e.msg, "danger", 3000));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);

  try {
    const res = await axios.put("api/profile/experience", body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const error = err.response.data.errors;

    if (error) {
      error.forEach((e) => {
        dispatch(setAlert(e.msg, "danger", 3000));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//Add education
export const addEducation = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);

  try {
    const res = await axios.put("api/profile/education", body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const error = err.response.data.errors;

    if (error) {
      error.forEach((e) => {
        dispatch(setAlert(e.msg, "danger", 3000));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//Delete Account and Profile
export const deleteAccount = () => async (dispatch) => {
  if(window.confirm('Are you sure ? This cannot be undone...')){
  try {
     await axios.delete('api/profile');
    dispatch({
      type: LOGOUT
    });
    dispatch({
      type: DELETE_ACCOUNT,
    });
    dispatch(setAlert("Your Account has been deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
}
};

