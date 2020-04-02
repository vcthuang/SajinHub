import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {

  constructor() {
    super();          // Get parent's property
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

  onSubmit (e) {
    // Prevent Submit button's default behavior
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      passpword: this.state.password,
      password2: this.state.password2
    };

    // Make API call
    axios
      .post ( '/api/users/register', newUser)
      .then ( res => console.log (res.data))
      .catch (err => this.setState ({ errors: err.resposne.data }))
  }

  render() {
    return (
      <div>
        hello from register
      </div>
    )
  }
}
