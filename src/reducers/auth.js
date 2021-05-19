import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT
} from "../action/type";

const initialState={
    token:localStorage.getItem('token'),
    isAuthendicated: null,
    loading : true,
    user:null
}

export default function auth (state=initialState,action){
    const {type,payload}= action;
    switch(type)
    {
        case USER_LOADED:
            return {
              ...state,
              isAuthendicated: true,
              loading: false,
              user:payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return({
                ...state,
                ...payload,
                isAuthendicated:true,
                loading:false
            });
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL: 
        case LOGOUT:
        case DELETE_ACCOUNT:       
            localStorage.removeItem('token');
             return {
               ...state,
              user:null,
               token:null,
               isAuthendicated: false,
               loading: false,
             };
        default:
            return state;     
    }

}