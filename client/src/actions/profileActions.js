// Profile Actions include:
// 1. updateProfile(profileData, history)
// 2. getCurrentProfile
// 3. getProfileByHandle(handle)
// 4. getProfileByID(userID)
// 5. getAllProfies
// 6. deleteAccount
// 7. AddFollowing(userID, history)
// 8. RemoveFollowing(userID, history)
// 9. setProfileLoading
// 10. Clear errors

// Make calls to server
import axios from 'axios';

// Redux dispatch types
import {
  SET_CURRENT_USER,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  SET_ERRORS,
  CLEAR_ERRORS
} from './types';

// 1. Create Profile
export const updateProfile = (profileData, history) => dispatch => {
  dispatch(clearErrors());
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

// 2. Get profile for current user
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

// 4. Get profile by ID
export const getProfileByID = userid => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get (`/api/profile/user/${userid}`)
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

// 5. Get all profiles
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


// 6. Delete account & profile
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

// 7. Subscribe or add Following
// We don't really do anything with the errors
export const addFollowing = (userid, history) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post(`/api/profile/followings/${userid}`)
    .then (res => {
      dispatch (getProfileByID(userid));
      dispatch (getAllProfiles())
    })
    .catch (err => history.push ('/profile'))
};

// 8. Remove subscribe or following
export const removeFollowing = (userid, history) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .delete(`/api/profile/followings/${userid}`)
    .then (res => {
      dispatch (getProfileByID(userid));
      dispatch (getAllProfiles())
    })
    .catch (err => history.push ('/profile'))
};

// 9. Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
};

// 10. Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
