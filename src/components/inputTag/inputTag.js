// import ChipInput from 'mui-material-chip-input';
import ChipInput from '@mui/material/Chip';

import React from 'react';
import { PropTypes } from 'prop-types';
import { isFunction } from 'utils/functions';

const InputTag = ({ field, form, placeholder, label, className, style, variant, disabled, onValueChanged }) => {
  const { value, name } = field;

  const { setFieldValue, errors, touched, setFieldTouched } = form;

  const onAdd = async (x) => {
    value.push(x);
    setFieldTouched(name, true);
    setFieldValue(name, value);
    if (isFunction(onValueChanged)) {
      await onValueChanged(form);
    }
  };

  const onDelete = async (x) => {
    const index = value.indexOf(x);
    setFieldTouched(name, true);
    setFieldValue(name, value);
    if (index > -1) {
      value.splice(index, 1);
      if (isFunction(onValueChanged)) {
        await onValueChanged(form);
      }
    }
  };

  const hasError = touched[name] && Boolean(errors[name]);

  return (
    <ChipInput
      disabled={disabled}
      style={style}
      error={hasError}
      helperText={errors[name]}
      className={className}
      value={value || []}
      variant={variant}
      placeholder={placeholder}
      label={label}
      onAdd={onAdd}
      onDelete={onDelete}
      margin="dense"
    />
  );
};

InputTag.defaultProps = {
  variant: 'outlined',
  disabled: false,
  style: { width: '100%' }
};

InputTag.propTypes = {
  // Evento que se ejecutara cada vez que cambie el valor del componente 'al agregar y al eliminar'
  onValueChanged: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object]),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.array])
  }),
  form: PropTypes.shape({
    errors: PropTypes.shape(),
    touched: PropTypes.shape(),
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired
  }).isRequired
};

export default InputTag;
