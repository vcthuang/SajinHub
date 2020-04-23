// Profile Actions include:
// 1. updateProfile(profileData, history)
// 2. getCurrentProfile
// 3. getProfileByHandle(handle)
// 4. getAllProfies
// 5. deleteAccount
// 6. setProfileLoading

// Make calls to server
import axios from 'axios';

// Redux dispatch types
import {
  SET_CURRENT_USER,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  SET_ERRORS
} from './types';

// 1. Create Profile
export const updateProfile = (profileData, history) => dispatch => {
  axios
    .post ('/api/profile', profileData)
    .then (res => history.push ('/profile'))
    .catch (err =>
      dispatch ({
        type: SET_ERRORS,
        payload: err.response.data
      })
    )
};

// 2. Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get ('/api/profile')
    .then (res =>
      dispatch ({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch (err =>
      dispatch ({
        type: GET_PROFILE,
        payload: {}
      })
    )
};

// 3. Get profile by handle
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

// 4. Get all profiles
export const getAllProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then (res =>
      dispatch ({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch (err =>
      dispatch ({
        type: GET_PROFILES,
        payload: null
      })
    );
};


// 5. Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm ('Are you sure?  This action can not be undone.')) {
    axios
    .delete ('api/profile')
    .then (res =>
      dispatch ({
        type: SET_CURRENT_USER,
        payload: null
      })
    )
    .catch (err =>
      dispatch ({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
  }
};

// 6. Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
};