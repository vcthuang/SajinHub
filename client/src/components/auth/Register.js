import React, { Component } from 'react';

// Conditional styling in JSX
import classnames from 'classnames'; 

// Redux Action
import { registerUser } from '../../actions/authActions';

// Pipe data from Redux store through UI (to Action)
import { connect } from 'react-redux';

// Safeguarding measure - Redux has to be running when Register component is called
import PropTypes from 'prop-types';

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

    // Call Redux Action and utilize built in props history
    this.props.registerUser (newUser, this.props.history);
  }

  // Changes in Redux Store will reflect here 
  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState ({errors: nextProps.errors});
    }
  }

  render() {
    // errors are updated via componentWillReceiveProps
    const { errors } = this.state;
    const { user } = this.props.auth;

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
                  {/* Bootstrap invalid-feedback - put font red & small */} 
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

// Create safety net as this component has dependencies
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,    // Redux Action
  errors: PropTypes.object.isRequired,    // Redux Store return object
}

// Read state data and place it in props
const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect (mapStateToProps, {registerUser}) (Register);