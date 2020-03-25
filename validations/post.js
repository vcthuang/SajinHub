const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validatePostInput = data => {

  // store errors in the object
  errors = {};

  // in case the key does not exist on UI
  data.text = (!isEmpty(data.text)) ? data.text : '';
  data.image = (!isEmpty(data.image)) ? data.image : '';

  // let's validate the required field: [text, image]
  if (!Validator.isLength(data.text, { min: 10, max: 200 })) {
    errors.text = 'Text must be between 10 and 200 characters'
  }

  if (isEmpty(data.text)) {
    errors.text = 'Text field is required'
  }

  if (!isEmpty(data.image)) {
    if (!Validator.isURL(data.image)) {
      errors.image = 'Not a valid URL';
    }
  }

  if (isEmpty(data.image)) {
    errors.Image = 'Image field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};