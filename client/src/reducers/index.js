// combine all REDUCERS in one "rootReducer"
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  authReducer, // => authReducer: authReducer
  errorReducer  // => errorReducer: errorReducer
});