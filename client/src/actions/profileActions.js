// Profile Actions include:
// 1. createProfile(profileData, history)
// 2. getCurrentProfile
// 3. getProfileByHandle(handle)
// 4. getAllProfies
// 5. deleteAccount
// 6. setProfileLoading

import axios from 'axios';

// Redux dispatch types
import {
  SET_CURRENT_USER,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  SET_ERRORS
} from './types';

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post ('/api/profile', profileData)
    .then (res => 
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch (err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    )
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get (`/api/profile/handle/${handle}`)
    .then (res =>
      dispatch ({
        type: GET_PROFILE,
        payload: res.data
      }))
    .catch (err =>
      dispatch ({
        type: GET_PROFILE,
        payload: {}
      }))
};

// Get all profiles
export const getAllProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};


// Delete account & profile
export const deleteAccount = () => dispatch => {

}

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
};
