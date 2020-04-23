// <textarea /> props are passed down to TextAreaField component

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaField = ({ placeholder, value, onChange, name, error, info }) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control", { "is-invalid": error })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  )
};

TextAreaField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string
}

export default TextAreaField;