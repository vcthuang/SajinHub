const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateLoginInput = data => {

  // store errors in the object
  errors = {};

  // in case the key does not exist on UI
  data.email = (!isEmpty(data.email)) ? data.email : '';
  data.password = (!isEmpty(data.password)) ? data.password : '';


  // let's validate the required fields: [email, password]

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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};