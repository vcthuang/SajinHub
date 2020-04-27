// User profile is loaded to Redux Store once the user is logged in
// Currently, all user profiles will be loaded on Redux Store if the user ever requested it
import {
  GET_PROFILE,
  GET_USER_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING
} from  '../actions/types';

const initialState = {
  profile: null,
  userProfile: null,
  profiles: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};