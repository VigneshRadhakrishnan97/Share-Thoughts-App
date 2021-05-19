import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,REMOVE_COMMENT
} from "./type";

//Get post
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//Add likes
export const addLike = (postID) => async (dispatch) => {
    
  try {
    const res = await axios.put(`api/posts/like/${postID}`);
   
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//Remove likes
export const removeLike = (postID) => async (dispatch) => {
      
  try {
    const res = await axios.put(`api/posts/unlike/${postID}`);
    
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};


//Delete post
export const deletePost = (postID) => async (dispatch) => {
     
  try {
    const res = await axios.delete(`api/posts/${postID}`);
    
    dispatch({
      type: DELETE_POST,
      payload: { postID },
    });
    dispatch(setAlert('POST removed','success'))

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//ADD post
export const addPost = (formData) => async (dispatch) => {
     const config={
         headers:{
             'Content-Type':'application/json'
         }
     }
     const body =JSON.stringify(formData);
  try {
    const res = await axios.post('api/posts', body, config);
    
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('POST Created','success'))

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//ADD comment
export const addComment = (postID,formData) => async (dispatch) => {
     const config={
         headers:{
             'Content-Type':'application/json'
         }
     }
     const body =JSON.stringify(formData);
  try {
    const res = await axios.post(`/api/posts/comments/${postID}`, body, config);
    
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Added','success'))

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

//Delete comment
export const deleteComment = (postID,commentID) => async (dispatch) => {
     
  try {
    const res = await axios.delete(
      `/api/posts/comments/${postID}/${commentID}`
    );
    
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentID,
    });
    dispatch(setAlert('Comment Removed','success'))

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};