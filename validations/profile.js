// Profile user input validation

const Validator = require ('validator');
const isEmpty = require ('./is-empty');

module.exports = function validateProfileInput (data) {
  
  // Initialize errors
  let errors = {};

  // Required Input:  handle
  // If there is no input for handle, assign null value
  data.handle = !isEmpty(data.handle) ? data.handle : '';

  // Check handle
  if (!Validator.isLength(data.handle, {min: 4, max: 40})) {
    errors.handle = 'Profile handle must be between 4 and 40 characters';
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  // Optional Inputs
  // If website is not empty then check its format
  if (!isEmpty(data.website)) {
    if ( !Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  // Personal bio should not be longer than 150 characters
  if (!Validator.isLength(data.bio, {min: 0, max: 150})) {
    errors.bio = 'Bio must be within 150 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}