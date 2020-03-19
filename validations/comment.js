const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateCommentInput = data => {

  // store errors in the object
  errors = {};

  // in case the key does not exist on UI
  data.text = (!isEmpty(data.text)) ? data.text : '';

  // let's validate the required field: [text]
  if (!Validator.isLength(data.text, { min: 3, max: 100 })) {
    errors.text = 'Text must be between 3 and 100 characters'
  }

  if (isEmpty(data.text)) {
    errors.text = 'Text field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};