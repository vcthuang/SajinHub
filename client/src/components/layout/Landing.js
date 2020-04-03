import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-overlay landing-text">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="display-3">Sajin Hub</div>
                <br />
                <Link to="/register" className="btn btn-dark mr-3">Sign Up</Link>
                <Link to="/login" className="btn btn-light">Log In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
