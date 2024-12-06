import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import fieldTypes from './field-types';

/**
 * This component generates the form fields.
 * @author Julian Andres Osorio
 */
const ControlGenerator = ({ type, name, ...rest }) => {
  const FieldComponent = fieldTypes[type];
  return <Field component={FieldComponent} name={name} {...rest} />;
};

ControlGenerator.propTypes = {
  // Tipo de input que se desea generar,
  // se debe enviar la abreviatura que se espeficica en constantes/Abreviaturas
  // los llamados FIELD_TYPE
  type: PropTypes.string.isRequired,
  // El name del campo para extraer el valor del input
  name: PropTypes.string.isRequired
};

export default ControlGenerator;
