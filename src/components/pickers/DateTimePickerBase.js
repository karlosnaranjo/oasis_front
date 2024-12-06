import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { DTP_DEFAULT_FORMAT, PRODUCE_STRING } from './constants';
import { finalValuesCases } from './functions';

/**
 *
 * props:
 *  produces: permite especificar el tipo de dato que generará el componente
 *  al momento de establecer un valor. Los valore posibles son string o date
 *
 *  format: permite especificar el formato con que se mostrarán las fechas
 *  por defecto se utiliza YYYY-MM-DD HH:mm:ss
 */

// TODO: corregir alerta de moment al momento de borrar el valor del input desde el teclado

function DateTimePickerBase({
  produces,
  format,
  label,
  field,
  form: {
    setFieldValue, errors, touched, setFieldTouched,
  },
  field: { name, value },
  ...rest
}) {
  const hasError = touched[name] && Boolean(errors[name]);
  const sanitizedValue = value || null;
  return (
    <KeyboardDateTimePicker
      {...rest}
      fullWidth
      autoComplete="off"
      inputVariant="outlined"
      margin="dense"
      name={name}
      clearable
      autoOk
      error={hasError}
      helperText={hasError && errors[name]}
      label={label}
      format={format}
      clearLabel="Limpiar"
      okLabel="Aceptar"
      cancelLabel="Cancelar"
      todayLabel="Hoy"
      value={sanitizedValue}
      animateYearScrolling={false}
      onChange={(valueToSet) => {
        let finalValue = valueToSet;
        if (valueToSet) {
          finalValue = finalValuesCases(finalValue, produces, format);
        }
        setFieldTouched(name, true);
        setFieldValue(name, finalValue);
      }}
    />
  );
}

DateTimePickerBase.defaultProps = {
  produces: PRODUCE_STRING,
  label: '',
  format: DTP_DEFAULT_FORMAT,
};

DateTimePickerBase.propTypes = {
  produces: PropTypes.string,
  label: PropTypes.string,
  field: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  format: PropTypes.string,
  form: PropTypes.shape({
    errors: PropTypes.shape(),
    touched: PropTypes.shape(),
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

export default DateTimePickerBase;
