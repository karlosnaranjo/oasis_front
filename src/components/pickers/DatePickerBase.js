import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import moment from 'moment';

const DP_DEFAULT_FORMAT = 'YYYY-MM-DD';
const PRODUCE_STRING = 'string';

// Ejemplo de función para manipular el valor de fecha
function finalValuesCases(value, produces, format) {
  // Esta es una versión simplificada de la función, debes ajustarla según tus necesidades
  if (produces === PRODUCE_STRING) {
    return value ? dayjs(value).format(format) : '';
  }
  return value;
}

function DatePickerBase({
  produces,
  format,
  label,
  form: { setFieldValue, errors, touched, setFieldTouched },
  field: { name, value },
  ...rest
}) {
  const sanitizedValue = value || null;
  const hasError = touched[name] && Boolean(errors[name]);

  return (
    <DatePicker
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
      value={dayjs(sanitizedValue)}
      // selected={dayjs(sanitizedValue).format('YYYY-MM-DD')}
      animateYearScrolling={false}
      onChange={(valueToSet) => {
        let finalValue = valueToSet;
        if (valueToSet) {
          finalValue = finalValuesCases(finalValue, produces, format);
        }
        setFieldTouched(name, true);
        setFieldValue(name, finalValue);
      }}
      {...rest}
    />
  );
}

DatePickerBase.defaultProps = {
  produces: PRODUCE_STRING,
  label: '',
  format: DP_DEFAULT_FORMAT
};

DatePickerBase.propTypes = {
  produces: PropTypes.string,
  label: PropTypes.string,
  field: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  format: PropTypes.string,
  form: PropTypes.shape({
    errors: PropTypes.shape(),
    touched: PropTypes.shape(),
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired
  }).isRequired
};

export default DatePickerBase;
