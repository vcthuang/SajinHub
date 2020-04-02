import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'

class Login extends Component {

  constructor() {
  super()
  this.state = {
    email: '',
    password: '',
    errors: {}
   }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
    
  onSubmit = e => {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    axios
    .post('/api/users/login', user)
    .then(res => console.log(res.data))
    .catch(err => this.setState({ errors: err.response.data }))
  }


  render() {
    const errors = this.state.errors
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="login-main text-center">
              <form onSubmit={ this.onSubmit } className="form-signin">
                <i className="fas fa-sign-in-alt"></i>
                <h2 className="login-h2">Login</h2>
                <input
                  type="email"
                  className={ classnames("form-control", { "is-invalid": errors.email }) }
                  placeholder="Email"
                  name="email"
                  value={ this.state.email }
                  onChange={ this.onChange }
                />
                <div className="invalid-feedback">{ errors.email }</div>
                <br />
                <input
                  type="password"
                  className={ classnames("form-control", { "is-invalid": errors.password }) }
                  placeholder="Password"
                  name="password"
                  value={ this.state.password }
                  onChange={ this.onChange }
                />
                { errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>) }
                <br />
                <button className="btn btn-dark btn-block" type="submit">Sign In</button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="login-image"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
