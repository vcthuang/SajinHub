// errorReducer writes "Error" part into Redux store
import { SET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

// errorReducer listens to the type "SET_ERRORS"
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload
    
    case CLEAR_ERRORS:
      return {};

    default:
      return state;
  }
};