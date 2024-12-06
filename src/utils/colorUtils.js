export const getContrastText = (color) => {
  // Función auxiliar para convertir el nombre del color en un valor RGB
  const colorNameToRGB = (color) => {
    const tempElement = document.createElement("div");
    tempElement.style.color = color;
    tempElement.style.display = "none";
    document.body.appendChild(tempElement);
    const rgbColor = window.getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);
    return rgbColor;
  };

  // Convertir el color del texto en formato RGB
  const rgbColor = colorNameToRGB(color);

  // Extraer los componentes de color
  const match = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return "#000000"; // Si no se puede extraer el color, devolver negro

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  // Calcular la luminancia según la fórmula WCAG
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Devolver blanco o negro dependiendo de la luminancia
  return luminance > 128 ? "#000000" : "#ffffff";
};
