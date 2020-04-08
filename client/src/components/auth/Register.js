import React, { Component } from 'react';
import axios from 'axios';                // API calls to server
import classnames from 'classnames';      // Conditional styling in JSX

class Register extends Component {

  constructor() {
    super();          // Get parent's component property
    this.state = {
      name: '',       // These variable names should match server and html
      email: '',
      password: '',
      password2: '',
      errors: {}      // For erros to display on UI
    }

    // simplify html coding at every onChange => {onChange.bind(this)}
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // This function pass parameters when there is user input
  onChange (e) {
    // Dynamically set key value pair
    this.setState ({[ e.target.name ]: e.target.value});
  }

  // This function is triggered when submit button is hit
  onSubmit (e) {
    // Prevent Submit button's default behavior
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };


  }

  render() {

    const {errors} = this.state;

    return (
      <div className = "register text-center">
        <div className = "container">
          <div className = "row">

            {/* Place a picture on the left */}
            <div className = "col-md-6 m-auto">
              {/* hide picture when device is smaller than md */}
              <div className = "register-image d-none d-md-block "></div>
            </div>

            {/* Place the register form on the left */}
            <div className = "col-md-6 m-auto">
              <form onSubmit = { this.onSubmit } className="form-register">
                
                {/* Icon & title */}
                <i className="fas fa-user-plus"></i>
                <h2 className = "Register-h2">Register</h2>
                
                {/* Name */}
                <div className = "form-group">
                  <input 
                    type="name"
                    className = { classnames ( "form-control", { "is-invalid":errors.name})}
                    placeholder = "Name"
                    value = { this.state.name}
                    onChange = { this.onChange}
                    name = "name"
                    required
                  />
                  {errors.name && (
                    <div className = "invalid-feedback">{errors.name}</div>
                  )}
                </div>

                {/* Email */}
                <div className = "form-group">
                  <input 
                    type="email"
                    className = { classnames ( "form-control", { "is-invalid":errors.email})}
                    placeholder = "Email"
                    value = { this.state.email}
                    onChange = { this.onChange}
                    name = "email"
                    required
                  />
                  {errors.email && (
                    <div className = "invalid-feedback">{errors.email}</div>
                  )}
                </div>

                 {/* Password */}
                 <div className = "form-group">
                  <input 
                    type="password"
                    className = { classnames ( "form-control", { "is-invalid":errors.password})}
                    placeholder = "Password"
                    value = { this.state.password}
                    onChange = { this.onChange}
                    name = "password"
                  />
                  {errors.password && (
                    <div className = "invalid-feedback">{errors.password}</div>
                  )}
                </div>

                 {/* Confirm Password */}
                 <div className = "form-group">
                  <input 
                    type="password"
                    className = { classnames ( "form-control", { "is-invalid":errors.password2})}
                    placeholder = "Confirm Password"
                    value = { this.state.password2}
                    onChange = { this.onChange}
                    name = "password2"
                  />
                  {errors.password2 && (
                    <div className = "invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <button className="btn btn-dark btn-block" type="submit">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;