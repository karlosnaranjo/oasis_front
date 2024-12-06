/**
 * Metodo genérico que dispara una descarga de un archivo por medio de javascript
 *
 * @param httpResponse los datos binarios que representan el archivo
 * @param filename el nombre con el cual se disparará la descarga del archivo
 * @author Daniel Tobón Mejía
 */
export const fireDownloadFromResponse = async (httpResponse, filename) => {
  const blob = await httpResponse.blob();
  const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = filename;
  a.click();
  const { parentNode } = a;
  if (parentNode) {
    parentNode.removeChild(a);
  }
};

export const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

/**
 * Metodo genérico que dispara una descarga de un archivo por medio de string
 *
 * @param cadena string que representan el archivo
 * @param filename el nombre con el cual se disparará la descarga del archivo
 */
export const fireDownloadFromString = async (cadena, filename) => {
  const downloadUrl = window.URL.createObjectURL(new Blob([cadena]));
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = filename;
  a.click();
  const { parentNode } = a;
  if (parentNode) {
    parentNode.removeChild(a);
  }
};
