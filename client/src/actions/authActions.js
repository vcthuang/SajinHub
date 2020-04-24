// Redux Dispatcher type
import { SET_CURRENT_USER, SET_ERRORS, CLEAR_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


// Interact with server
import axios from 'axios';

// when the user clicks submit button on the registration page, registerUser gets triggered
export const registerUser = (userData, history) => dispatch => {
  dispatch(clearErrors());
  
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

// when the user clicks login button on the login page, loginUser gets triggered
export const loginUser = userData => dispatch => {
  dispatch(clearErrors());
  axios
  .post('/api/users/login', userData)
  .then(res => {
    // upon login, get the token
    const token = res.data.token;

    // 1. save the token in the localStorage(browser)
    localStorage.setItem('jwtToken', token);

    // 2. set the token on the Authorization Header for every axios request
    setAuthToken(token);

    // 3. decrypt the token and get user info (id, name, avatar, iat, exp)
    const decoded = jwt_decode(token);

    // 4. make a dispatch call to save user info(decoded) in Redux store
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
     })
    }
  )
  .catch(err =>
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  );
};

// 1) when the user clicks logout button 2) when the browser session has expired, logoutUser gets triggered
export const logoutUser = () => dispatch => {
  // 1. empty out localStorage
  localStorage.removeItem('jwtToken');

  // 2. detach the token from the Authentication Header
  setAuthToken(false);

  // 3. make a dipatch call to remove user info from Redux store
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  })

   window.location.href = '/login';
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
}