import { 
  POST_LOADING, 
  GET_ALL_POSTS, 
  GET_POST, 
  CREATE_POST, 
  DELETE_POST, 
  SET_ERRORS, 
  CLEAR_ERRORS } from './types';

import axios from 'axios';

// Get All Posts
export const getAllPosts = () => dispatch => {
  axios
  .get('/api/posts')
  .then(res => dispatch({
    type: GET_ALL_POSTS,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_ALL_POSTS,
    payload: []
  }))
}

// Get Post
export const getPost = postId => dispatch => {
  dispatch(setPostLoading())
  axios
  .get(`/api/posts/${postId}`)
  .then(res => dispatch({
    type: GET_POST,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_POST,
    payload: {}
  }))
}

// Create Post
export const createPost = postData => dispatch => {
  dispatch(clearErrors())
  axios
  .post('/api/posts', postData)
  .then(res => dispatch({
    type: CREATE_POST,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: SET_ERRORS,
    payload: err.response.data
  }))
}

// Like Post
export const likePost = postId => dispatch => {
  axios
  .post(`/api/posts/like/${postId}`)
  .then(res => dispatch(getAllPosts()
  ))
  .catch(err => dispatch({
    type: SET_ERRORS,
    payload: err.response.data
  }))
}

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors())
  axios
  .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
  .catch(err => dispatch({
    type: SET_ERRORS,
    payload: err.response.data
  }))
}

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
  .delete(`/api/posts/comment/${postId}/${commentId}`)
  .then(res => dispatch({
    type: GET_POST,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: SET_ERRORS,
    payload: err.response.data
  }))
}

// Add Reply
export const addReply = (postId, commentId, replyData) => dispatch => {
  dispatch(clearErrors())
  axios
  .post(`/api/posts/comment/${postId}/${commentId}`, replyData)
  .then(res => dispatch({
      type: GET_POST,
      payload: res.data
  }))
  .catch(err => dispatch({
    type: SET_ERRORS,
    payload: err.response.data
  }))
}

// Delete Reply
export const deleteReply = (postId, commentId, replyId) => dispatch => {
  axios
  .delete(`/api/posts/comment/${postId}/${commentId}/${replyId}`)
  .then(res => dispatch({
    type: GET_POST,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: SET_ERRORS,
    payload: err.response.data
  }))
}

// Delete Post
export const deletePost = postId => dispatch => {
  axios
  .delete(`/api/posts/${postId}`)
  .then(res => dispatch({
    type: DELETE_POST,
    payload: postId
  }))
  .catch(err => dispatch({
    type: SET_ERRORS,
    payload: err.response.data
  }))
}

// Set Loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
