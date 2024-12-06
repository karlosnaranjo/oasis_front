import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const TextBase = React.forwardRef(
  ({ field: { name, value, onBlur, onChange, type = 'text' }, form: { touched, errors }, ...props }, ref) => {
    const hasError = touched[name] && Boolean(errors[name]);
    return (
      <TextField
        id={name}
        size="small"
        inputRef={ref}
        variant="outlined"
        type={type}
        autoComplete="off"
        error={hasError}
        helperText={hasError && errors[name]}
        fullWidth
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        margin="dense"
        {...props}
      />
    );
  }
);

TextBase.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired
  }).isRequired,
  setRef: PropTypes.func
};

export default TextBase;
