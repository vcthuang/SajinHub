import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
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

          <div class="collapse navbar-collapse" id="navbarNav">
            {/* Place all the icoons on the right */}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to='/'><i className="fas fa-house-user nav-icon"></i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/login'><i className="fas fa-sign-in-alt nav-icon"></i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/posts'><i className="fas fa-edit nav-icon"></i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/profile/all'><i className="fas fa-heart nav-icon"></i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/profile'><i className="fas fa-address-card nav-icon"></i></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;