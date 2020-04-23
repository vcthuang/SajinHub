import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import InputField from '../common/InputField';  // <input /> field component

class Login extends Component {

  constructor() {
  super()
  this.state = {
    email: '',
    password: '',
    errors: {}
   }

   this.onChange = this.onChange.bind(this);
  }

  // when the user types in the textbox, onChange function gets triggered
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  // when the user clicks submit button
  onSubmit = e => {

    // prevents default html behavior
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    // pass user data to loginUser() (Redux cycle)
    this.props.loginUser(user)
  }

  // when Login Component is loaded, this function will be invoked immediately
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/posts')
    }
  }

  // when Login Component receives new data(into this.props), this function will be invoked
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/feed')
    }

    if (this.props.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  render() {
    const errors = this.state.errors
    return (
      <div className="container">
        <div className="row">
          {/* left: login form [ email and password ] */}
          <div className="col-md-6">
            <div className="login-main text-center">
              <form onSubmit={ this.onSubmit } className="form-signin">
                <i className="fas fa-sign-in-alt"></i>
                <h2 className="login-h2">Login</h2>
                <InputField 
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <button className="btn btn-dark btn-block" type="submit">Sign In</button>
              </form>
            </div>
          </div>
          {/* right: image */}
          <div className="col-md-6">
            <div className="login-image">
              <div className="login-image d-none d-md-block "></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// PropTypes ensures to load Login Component successfully when the application starts 
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

// put state (from Redux store) into props
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

// put loginUser (from authActions.js) into props
const dispatchToProps = {
  loginUser
}

// Redux Store => Login Component => Redux Action 
export default connect(mapStateToProps, dispatchToProps)(Login);
