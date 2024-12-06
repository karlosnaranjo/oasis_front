import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  helperText: {
    color: '#EA4D4D',
    width: '100%'
  }
}));

/**
 * This component allows to render a dropdown ready to work with formik
 * @param {*} param0
 */
const SelectBase = React.forwardRef(
  (
    {
      items = [],
      label,
      filter = false,
      onOptionSelected,
      field: { name, onBlur, value, onChange },
      form: { touched, errors, setFieldValue, setFieldTouched },
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(null);

    useEffect(() => {
      setInputValue(items.find((item) => item.value === value) || null);
    }, [filter, value, items]);

    const handleChangeAutocomplete = async (e, itemSelected) => {
      const { value: selectedValue = '', label: selectedLabel = '' } = itemSelected || {};
      if (onOptionSelected) {
        await onOptionSelected(selectedValue, selectedLabel, name);
      }
      setFieldTouched(name, true);
      setFieldValue(name, selectedValue);
    };

    const hasError = touched[name] && Boolean(errors[name]);
    return (
      <Autocomplete
        id={name}
        name={name}
        value={inputValue}
        onChange={handleChangeAutocomplete}
        getOptionLabel={(option) => option.label || ''}
        // getOptionSelected={(option) => option.value === (inputValue.value ?? '')}
        options={items}
        fullWidth
        {...props}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label={label}
            variant="outlined"
            inputRef={ref}
            autoComplete="off"
            error={hasError}
            helperText={hasError && errors[name]}
            fullWidth
            margin="dense"
          />
        )}
      />
    );
  }
);

SelectBase.propTypes = {
  form: PropTypes.shape({
    errors: PropTypes.shape(),
    touched: PropTypes.shape(),
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired
  }).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  filter: PropTypes.bool,
  // Funcion que se ejecutara al momento de seleccionar un Item.
  // retorna el value del item seleccionado solo para autocomplete
  onOptionSelected: PropTypes.func
};

export default SelectBase;
