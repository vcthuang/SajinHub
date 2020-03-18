const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRegisterInput = data => {

  // store errors in the object
  errors = {};

  // in case the key does not exist on UI
  data.name = (!isEmpty(data.name)) ? data.name : '';
  data.email = (!isEmpty(data.email)) ? data.email : '';
  data.password = (!isEmpty(data.password)) ? data.password : '';
  data.password2 = (!isEmpty(data.password2)) ? data.password2 : '';

  // let's validate the required fields: [name, email, password, password2]
  if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = 'Name must be between 3 and 20 characters'
  }

  if (isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email'
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  if (!Validator.isLength(data.password, { min: 8, max: 15 })) {
    errors.password = 'Password must be between 8 and 15 characters'
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.pasword2 = 'Password must match'
  }

  if (isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};