export default function CalcularDigitoVerificacion(parameter) {
  // FIXME: se debe validar cuando el parametro es un alfanumerico
  const vpri = [];
  let x;
  let y;
  let i;
  let nit = parameter;

  // Se limpia el Nit
  nit = nit.replace(/\s/g, ''); // Espacios
  nit = nit.replace(/,/g, ''); // Comas
  nit = nit.replace(/\./g, ''); // Puntos
  nit = nit.replace(/-/g, ''); // Guiones

  // Procedimiento
  const z = nit.length;

  vpri[1] = 3;
  vpri[2] = 7;
  vpri[3] = 13;
  vpri[4] = 17;
  vpri[5] = 19;
  vpri[6] = 23;
  vpri[7] = 29;
  vpri[8] = 37;
  vpri[9] = 41;
  vpri[10] = 43;
  vpri[11] = 47;
  vpri[12] = 53;
  vpri[13] = 59;
  vpri[14] = 67;
  vpri[15] = 71;

  x = 0;
  y = 0;
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < z; i++) {
    y = nit.substr(i, 1);

    x += y * vpri[z - i];
  }

  y = x % 11;

  return y > 1 ? 11 - y : y;
}
