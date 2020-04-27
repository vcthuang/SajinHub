import React from 'react';
import './App.css';

// BEGIN Import libraries
//

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';   // Routing

import {Provider} from 'react-redux';                              // Redux
import store from './store';

// Our own components
import Navbar from './components/layout/Navbar';                   // Layout
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';                 // Authenticaiton
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';                // Profile
import ProfileHome from './components/profile/ProfileHome';
import ProfileCreate from './components/profile/ProfileCreate';
import ProfileUpdate from './components/profile/ProfileUpdate';
import ProfileList from './components/profileList/ProfileList';
import ProfileByID from './components/profile/ProfileByID';

import Posts from './components/posts/Posts';
import Post from './components/posts/Post';

import jwt_decode from 'jwt-decode';                               // Decrypt
import { logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import { SET_CURRENT_USER } from './actions/types';
import PostForm from './components/posts/PostForm';
import UserPosts from './components/posts/UserPosts';

import PrivateRoute from './components/common/PrivateRoute';


//
// END Import libraries


// when the user comes back to the app (re-open the browser): 1) check if the token is still in the localStorage, 2) check if the token has expired, 3) re-save user info in Redux store since this is a new browser session
if (localStorage.jwtToken) {

  // 1. decrypt token
  const decoded = jwt_decode(localStorage.jwtToken);

  // 2. check if the token has expired
  if (decoded.exp < Date.now()/1000) {

    // token has expired: empty out localStorage, detach token from Authentication Header, remove user info in Redux store
    store.dispatch(logoutUser());

    // relocate user to login page
    window.location.href = '/login';
  }

  // 3. token has NOT expired: set token on the Authorization Header for every axios request
  setAuthToken(localStorage.jwtToken);

  // 4. authReducer picks up this action, saves user info into Redux store
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  })
}

function App() {
  return (
  <Provider store = {store}>
    <Router>
        <Navbar />
        <Route exact path = '/' component = {Landing} />
        <Route exact path = '/register' component = {Register} />
        <Route exact path = '/login' component = {Login} />
        <Route exact path = '/profiles' component = {ProfileList} />
        <Route exact strict path= "/profile/:handle" component={Profile} />
        
        <Switch>
          <PrivateRoute exact path= "/profile" component= {ProfileHome} />
        </Switch>
        <Switch>
          <PrivateRoute exact strict path= "/profile/user/:userid" component= {ProfileByID} />
        </Switch>
        <Switch>
          <PrivateRoute exact path= "/profile-create" component= {ProfileCreate} />
        </Switch>
        <Switch>
          <PrivateRoute exact path= "/profile-update" component= {ProfileUpdate} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/feed" component={Posts} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/posts/:id" component={Post} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/post" component={PostForm} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/userposts/:id" component={UserPosts} />
        </Switch>

        <Footer />
    </Router>
  </Provider>
  );
}

export default App;