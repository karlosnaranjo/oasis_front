import React, { useState } from "react";
import UploadMultiFile from "components/upload/UploadMultiFile"; // Ajusta la ruta de importación según la ubicación de tu componente UploadMultiFile
import { withApi, withNotification } from "wrappers";
import PropTypes from "prop-types";
import InterfaceResultModal from "./result";

function UploadForm({ doPostFormData, appError }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [result, setResult] = useState(null);

  const handleRemove = (fileToRemove) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleFileDrop = (droppedFiles) => {
    const newFiles = droppedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
      file: file,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files[]", file.file, file.name);
    });

    const params = {
      url: `import_massive_api`,
      data: formData,
    };

    try {
      // Enviamos el FormData usando el método postFormData de ApiServiceFetch
      const response = await doPostFormData(params);
      setResult(response.response.data);
      setConfirm(true);
      handleRemoveAll();
    } catch (error) {
      console.error("Error en la subida de archivos:", error);
      appError("Error en la subida de archivos.");
    }
    /* axios
      .post(
        `${process.env.REACT_APP_API_SERVER}${process.env.REACT_APP_API_VERSION}import_massive`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setResult(response.data);
        setConfirm(true);
        handleRemoveAll();
        console.log("Archivos subidos exitosamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al subir archivos:", error);
      }); */
  };

  return (
    <div>
      <UploadMultiFile
        title={`Cargar Archivos de forma masiva`}
        message={`Arrastre y suelte los archivos o haga click en esta área para 
      seleccionarlos desde su equipo, este proceso toma los archivos de tipo CSV
      de productos u Ordenes de trabajo y los carga a la base de datos, los 
      archivos de imágen, los asocia al producto y los demas archivos los 
      asocia a las ordenes de compra como archivos adjuntos`}
        showPreview={false}
        error={error}
        files={files}
        onRemove={handleRemove}
        onRemoveAll={handleRemoveAll}
        onDrop={handleFileDrop}
        onUpload={handleUpload}
      />
      {Boolean(confirm) && (
        <InterfaceResultModal
          open
          data={result}
          onClose={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

UploadForm.propTypes = {
  doPut: PropTypes.func,
  doPost: PropTypes.func,
  doPostFormData: PropTypes.func,
  appError: PropTypes.func.isRequired,
  doGet: PropTypes.func,
  appInfo: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
};

export default withApi(withNotification(UploadForm));
