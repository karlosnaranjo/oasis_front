import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { TextField } from '@mui/material';

const NumberFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

NumberFormatCustom.propTypes = {
  // inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const NumberBase = React.forwardRef(
  ({ field: { name, value, onBlur, onChange }, form: { touched, errors }, ...props }, ref) => {
    const hasError = touched[name] && Boolean(errors[name]);
    return (
      <TextField
        id={name}
        size="small"
        inputRef={ref}
        variant="outlined"
        autoComplete="off"
        error={hasError}
        helperText={hasError && errors[name]}
        fullWidth
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        margin="dense"
        InputProps={{
          inputComponent: NumberFormatCustom
        }}
        {...props}
      />
    );
  }
);

NumberBase.propTypes = {
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

export default NumberBase;
