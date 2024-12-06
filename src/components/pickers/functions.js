import moment from 'moment';
import { PRODUCE_STRING, PRODUCE_DATE } from './constants';

/**
 * Función que se utilizará al momento de establecer el valor del input.
 * Contiene la logica necesaria que se ejecutará al momento
 * de seleccionar una fecha
 *
 * @param {Date} value el valor que se procesará
 * @param {string} caso indica el case y la operacion que se realizará
 * @param {string} format el formato con el que se procesará la fecha ingresada en value
 *
 * @return {string | date} dependiendo de lo indicado en el param caso
 */
export const finalValuesCases = (value, caso, format) => {
  switch (caso) {
    case PRODUCE_STRING:
      return moment(value).format(format);
    case PRODUCE_DATE:
    default:
      return value;
  }
};

export default {};
