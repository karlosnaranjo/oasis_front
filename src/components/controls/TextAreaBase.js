import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const TextAreaBase = ({ field: { name, onBlur, value, onChange }, form: { touched, errors }, rows, ...props }) => {
  const hasError = touched[name] && Boolean(errors[name]);
  return (
    <TextField
      id={name}
      size="small"
      margin="dense"
      variant="outlined"
      autoComplete="off"
      multiline
      rows={rows}
      error={hasError}
      helperText={hasError && errors[name]}
      fullWidth
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

TextAreaBase.defaultProps = {
  rows: 2
};

TextAreaBase.propTypes = {
  rows: PropTypes.number,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired
  }).isRequired
};

export default TextAreaBase;
