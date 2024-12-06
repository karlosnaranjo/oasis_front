import React from 'react';
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { isFunction } from 'utils/functions';

const DropdownMultiple = ({ field, items, form, onOptionSelected, ...otherProps }) => {
  const { value: valueField = [], name } = field;
  const { touched, errors, setFieldValue } = form;
  const onchange = async (opcion, value) => {
    const values = items.filter((item) => value.includes(item)).map((item) => item.value);
    if (onOptionSelected) {
      await onOptionSelected(values);
    }

    setFieldValue(name, values);
    if (isFunction(otherProps.onChange)) {
      otherProps.onChange(values);
    }
  };
  const selected = items.filter((item) => valueField.includes(item.value));
  const hasError = touched[name] && Boolean(errors[name]);
  delete otherProps.proxyonblur;
  delete otherProps.proxyonchange;

  return (
    <Autocomplete
      multiple
      size="small"
      options={items}
      getOptionLabel={(option) => option.label}
      onChange={onchange}
      value={selected}
      renderInput={(params) => (
        <TextField
          {...params}
          error={hasError}
          helperText={hasError && errors[name]}
          variant="outlined"
          margin="dense"
          {...otherProps}
        />
      )}
    />
  );
};

DropdownMultiple.propTypes = {
  disabled: PropTypes.bool,
  items: PropTypes.oneOfType([PropTypes.any]),
  field: PropTypes.oneOfType([PropTypes.any]),
  form: PropTypes.oneOfType([PropTypes.any]),
  proxyonchange: PropTypes.func,
  // Funcion que se ejecutara al momento de seleccionar un Item.
  onOptionSelected: PropTypes.func
};

export default DropdownMultiple;
