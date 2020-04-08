// Redux Dispatcher type
import { SET_CURRENT_USER, SET_ERRORS } from './types';

// Interact with server
import axios from 'axios';

// when the user clicks submit button on the registration page, registerUser ACTION gets triggered
export const registerUser = (userData, hisstory) => dispatch => {
  
  // Make API call
  axios
  .post ( '/api/users/register', userData)
  
  // If successful, send user to login page
  .then ( res => history.push ('/login'))
  
  // else dispatch error message
  .catch (err => 
    dispatch ({
      type: SET_ERRORS,
      payload: err.response.data
    })
  );
};

// when the user clicks login button on the login page, loginUser ACTION gets triggered
export const loginUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  }
};