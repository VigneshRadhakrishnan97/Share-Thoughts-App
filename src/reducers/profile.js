import {
  GET_PROFILE,
  PROFILE_ERROR,
  LOGOUT,
  UPDATE_PROFILE,
  CLEAR_PROFILES,
  GET_PROFILES,
  GET_REPOS
} from "../action/type";

const initialstate = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function profile(state = initialstate, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false, error: {} };
    case GET_PROFILES:
      return({
        ...state,profiles:payload,loading:false
      })
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false, profile: null };
    case LOGOUT:
    case CLEAR_PROFILES:
      return { ...state, error: {}, loading: false, profile: null, repos: [] };
    case GET_REPOS:
      return {
        ...state,
        repos: payload
      };  
    default:
      return state;
  }
}
