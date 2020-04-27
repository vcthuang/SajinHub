import { 
  POST_LOADING, 
  GET_ALL_POSTS, 
  GET_USER_POSTS,
  GET_POST, 
  CREATE_POST, 
  DELETE_POST } from '../actions/types';

const initialState = {
  post: {},
  userposts: [],
  posts: [],
  loading: false
}

export default function (state = initialState, action) {

  switch (action.type) {

    case POST_LOADING: 
      return {
        ...state,
        loading: true
      }

    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case GET_USER_POSTS:
      return {
        ...state,
        userposts: action.payload,
        loading: false
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }

    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }

    default:
      return state;
  }
}