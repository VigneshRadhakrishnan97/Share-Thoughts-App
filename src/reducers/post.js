import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,ADD_COMMENT,REMOVE_COMMENT
} from "../action/type";

const initialstate={
    posts:[],
    post:null,
    loading:true,
    error:null
}

export default function post (state=initialstate,action){
    const {type,payload} = action;

    switch (type) {
      case GET_POSTS:
        return {
          ...state,
          posts: payload,
          loading: false,
        };
      case GET_POST:
        return {
          ...state,
          post: payload,
          loading: false,
        };
      case ADD_POST:
        return {
          ...state,
          posts: [payload, ...state.posts],
          loading: false,
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter((post) => {
            return post._id !== payload.postID;
          }),
          loading: false,
        };
      case POST_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case UPDATE_LIKES:
        return {
          ...state,
          posts: state.posts.map((post) => {
            return post._id === payload.postID
              ? { ...post, likes: payload.likes }
              : post;
          }),
          loading: false,
        };
      case ADD_COMMENT:
        return {
          ...state,
          post: { ...state.post, comments: payload },
          loading: false,
        };
      case REMOVE_COMMENT:
        return {
          ...state,
          post: { ...state.post, comments: state.post.comments.filter((comment)=>(comment._id!== payload)) },
          loading: false,
        };
      default:
        return state;
    }

}