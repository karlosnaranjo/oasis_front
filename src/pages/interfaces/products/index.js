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
      url: `products/import_csv/sfc`,
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
  };

  return (
    <div>
      <UploadMultiFile
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
  doGet: PropTypes.func,
  appInfo: PropTypes.func.isRequired,
  appError: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
};

export default withApi(withNotification(UploadForm));
