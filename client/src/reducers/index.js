// combine all REDUCERS in one "rootReducer"
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  authReducer // => authReducer: authReducer
});