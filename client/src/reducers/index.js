// combine all REDUCERS in one "rootReducer"
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer, 
  post: postReducer,
  errors: errorReducer  
});