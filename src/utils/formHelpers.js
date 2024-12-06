export function getStatusLabel(value) {
  return value === false || value === 0 ? "Inactivo" : "Activo";
}

export function getStatusValue(label) {
  return label == "Activo" ? true : false;
}

export const getBooleanLabel = (value) => {
  return value === true || value === 1 ? "Sí" : "No";
};
