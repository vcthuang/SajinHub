// Redux Dispatcher type
import { SET_CURRENT_USER, SET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


// Interact with server
import axios from 'axios';

// when the user clicks submit button on the registration page, registerUser ACTION gets triggered
export const registerUser = (userData, history) => dispatch => {
  
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
export const loginUser = userData => dispatch => {
  axios
  .post('/api/users/login', userData)
  .then(res => {
    // upon login, get the token
    const token = res.data.token;
    // save token in the local storage(browser)

    // set token on Authorization Header
    setAuthToken(token);

    // decrypt token
    const decoded = jwt_decode(token);
    // make a dispatch call 
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