import React from 'react';
import './App.css';

// BEGIN Import libraries
//

import {BrowserRouter as Router, Route} from 'react-router-dom';   // Routing

// import {Provider} from 'react-redux';                              // Redux
// Our own components
import Navbar from './components/layout/Navbar';                   // Layout
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';                 // Authenticaiton
import Login from './components/auth/Login';
//
// END Import libraries


function App() {
  return (
    // No Redux store yet
    //<Provider store = {store}>
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path = '/' component = {Landing} />
        <Route exact path = '/register' component = {Register} />
        <Route exact path = '/Login' component = {Login} />
        <Footer />
      </div>
    </Router>
    //</Provider>
  );
}

export default App;