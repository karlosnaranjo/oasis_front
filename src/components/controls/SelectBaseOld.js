import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

/**
 * This component allows to render a dropdown ready to work with formik
 * @param {*} param0
 */
const SelectBase = React.forwardRef(
  (
    { items, label, onOptionSelected, field: { name, value }, form: { touched, errors, setFieldValue }, ...props },
    ref
  ) => {
    const [inputValue, setInputValue] = useState({});

    useEffect(() => {
      if (items) {
        setInputValue(items.find((item) => item.value === value) || null);
      }
    }, [value, items]);

    const handleChange = async (e, itemSelected) => {
      if (onOptionSelected) {
        await onOptionSelected(itemSelected);
      } else {
        setFieldValue(name, itemSelected?.value ?? '');
      }
    };

    const onClose = async () => {
      setInputValue(items.find((item) => item.value === value) || null);
    };

    const onOpen = async () => {
      setInputValue(null);
    };

    const hasError = touched[name] && Boolean(errors[name]);
    return (
      <Autocomplete
        id={name}
        name={name}
        clearText="Limpiar"
        closeText="Cerrar"
        openText="Abrir"
        noOptionsText="Sin opciones"
        autoSelect
        onOpen={onOpen}
        onClose={onClose}
        inputValue={inputValue?.label || ''}
        onChange={handleChange}
        getOptionLabel={(option) => option.label || ''}
        isOptionEqualToValue={(option) => option.value === (value ?? '')}
        options={items}
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
    onChange: PropTypes.func,
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
  // retorna el value del item seleccionado
  onOptionSelected: PropTypes.func
};

export default SelectBase;
