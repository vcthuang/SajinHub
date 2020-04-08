import { SET_CURRENT_USER, SET_ERRORS } from './types';
import axios from 'axios';

// when the user clicks submit button on the registration page, registerUser ACTION gets triggered
export const registerUser = userData => {
  return {
    type:SET_CURRENT_USER,
    payload: userData
  }
};

// when the user clicks login button on the login page, loginUser ACTION gets triggered
export const loginUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  }
};