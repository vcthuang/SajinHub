import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// organize data using thunk library
const middleware  = [thunk]

// create store with 1) reducers 2) initial data 3) enhancing data using thunk + debugging
const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;