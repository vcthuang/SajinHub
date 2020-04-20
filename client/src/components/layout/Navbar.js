import React, { Component } from 'react';

// Routing pages
import { Link } from 'react-router-dom';

// Redux related libraries
import { connect } from 'react-redux';      
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

class Navbar extends Component {
  
  onLogoutClick(e) {
    e.preventDefault();       // Prevent default behavior when button is clicked
    this.props.logoutUser();  // Call Redux Action - logoutUser
  }

  render() {
    // Navbar will display different icons depending on user's login status
    // To to this, first, obtain status from Redux store
    const { isAuthenticated, user } = this.props.auth;

    // Second, create htmls that can be dynamically swapped
    const guestLinks = (     
      // Place all the icons on the right  
      <ul className="navbar-nav ml-auto">
        {/* Home icon */}
        <li className="nav-item">
          <Link className="nav-link" to='/'>
            <i className="fas fa-house-user nav-icon" title = "home"></i>
          </Link>
        </li>
      
        {/* Reigster icon */}
        <li className="nav-item">
          <Link className="nav-link" to='/register'>
            <i className="fas fa-user-plus nav-icon" title = "register"></i>
          </Link>
        </li>       
        
        {/* Login Icon */}
        <li className="nav-item">
          <Link className="nav-link" to='/login'>
            <i className="fas fa-sign-in-alt nav-icon" title = "login"></i>
          </Link>
        </li>       
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        {/* Home icon */}
        <li className="nav-item">
          <Link className="nav-link" to='/'>
            <i className="fas fa-house-user nav-icon" title = "home"></i>
          </Link>
        </li>

        {/* Post icon */}    
        <li className="nav-item">
          <Link className="nav-link" to='/posts'>
            <i className="fas fa-edit nav-icon" title = "post"></i>
          </Link>
        </li>

        {/* Like icon */}
        <li className = "nav-item">
          <Link className = "nav-link" to = '/profile/user'>
            <i className="fas fa-heart nav-icon" title = "following"></i>
          </Link>
        </li>
        
        {/* Logout */}
        <li className="nav-item">
          <a className="nav-link" href="" onClick= {this.onLogoutClick.bind(this)}>
            <i class="fas fa-sign-out-alt nav-icon" title = "logout"></i>
          </a>
        </li>

        {/* Profile */}
        <li className="nav-item">
          <Link className="nav-link" to='/profile'>
            <img
              className = "rounded-circle"
              src= {user.avatar}
              alt= {user.name}
              style = {{width:'25px', marginRight: '5px'}}
              title = "profile"
            />
          </Link>
        </li>
      </ul>
    );

    return (
      // Bootstrap Navbar
      <nav className="navbar navbar-expand-sm navbar-light bg-light nav-main" >
        <div className="container">
          {/* Have logo on the left */}
          <Link className="navbar-brand" to="/">SajinHub</Link>

          {/* Dropdown meanu to appear when screen size is smaller than sm */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Display user profiles */}
            <ul className="navbar-nav mr-auto">
              <li className = "nav-item">
                <Link className = "nav-link" to = '/profiles'>
                  <i className="fas fa-users nav-icon" title = "profiles"></i>
                </Link>
              </li>
            </ul>
            
            { isAuthenticated ? authLinks : guestLinks }

          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect ( mapStateToProps, {logoutUser})(Navbar);