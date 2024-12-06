import React from 'react';
import PropTypes from 'prop-types';
import { Switch, FormControlLabel } from '@mui/material';

const SwitchBase = React.forwardRef(
  ({ label, field: { name, value, onChange }, form: { setFieldValue, setFieldTouched }, ...props }, ref) => {
    const handleChange = (event) => {
      if (onChange) {
        onChange(event);
      }
      setFieldTouched(name, true);
      setFieldValue(name, event.target.checked);
    };

    return (
      <FormControlLabel
        control={
          <Switch id={name} inputRef={ref} checked={Boolean(value)} value={name} onChange={handleChange} {...props} />
        }
        label={label}
      />
    );
  }
);

SwitchBase.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.any])
  }).isRequired,
  form: PropTypes.shape({
    errors: PropTypes.shape(),
    touched: PropTypes.shape(),
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired
  }).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func
};

SwitchBase.defaultProps = {
  label: ''
};

export default SwitchBase;
