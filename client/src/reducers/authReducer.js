// authReducer writes "Aunthentication" part into Redux store
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user : {}
}

// App.js wakes reducer up with default state
// authReducer listens to the type "SET_CURRENT_USER"
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      }

    default:
      // returns state to Redux store
      return state;
  }
};