import { ReportableException } from 'exceptions';
import messages from 'constantes/messages';

/**
 * Esta función permite limpiar una cadena y usarse dentro de expresiones regulares.
 */
export const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Función que intenta extraer de un objeto un elemento por medio
 * de notacion de punto
 *
 * @param {object} object el objeto al cual se el intentará extraer el campo u elemento
 * @param {string} dotNotation la notacion por la cual se accedería al campo por medio
 * de puntos.
 */
export const dotNotationExtractor = (object, dotNotation) =>
  dotNotation.split('.').reduce((total, currentValue) => {
    if (total) {
      return total[currentValue];
    }
    return null;
  }, object);

/**
 * Función que contiene una lógica básica para determinar si un elemento
 * es de tipo funcion.
 *
 * @param {any} toCheck el elemento a verificar
 * @return {boolean} true si el elemento pasa como funcion.
 */
export const isFunction = (toCheck) => typeof toCheck === 'function';

/**
 * Función genérica que busca manejar las exceptions lanzadas desde
 * la interaccion con el back. Detecta básicamente el tipo de exception
 * y la administra o notificando de diferente manera.
 *
 * @param {Error} exception un error entregado desde un catch
 * @param {withApi} object un descendente de withNotification
 * @see witNotification wrapper.
 */
export const genericExceptionHandler = (exception, object) => {
  if (exception instanceof ReportableException) {
    object.props.appWarning(exception.message);
  } else {
    object.props.appError(messages.crud.fail, exception);
  }
};

export const fireDownloadFromResponse = async (httpResponse, filename) => {
  const blob = await httpResponse.blob();
  const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  a.click();
  const { parentNode } = a;
  if (parentNode) {
    parentNode.removeChild(a);
  }
};
