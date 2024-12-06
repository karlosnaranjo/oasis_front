import React, { useState, useEffect } from "react";
import UploadMultiFile from "components/upload/UploadMultiFile"; // Ajusta la ruta de importación según la ubicación de tu componente UploadMultiFile
import PropTypes from "prop-types";
import { withApi, withNotification } from "wrappers";
import messages from "constantes/messages";
import axios from "axios";
import { ConfirmModal } from "components/dialogs";
import endPoints from "endPoints/endPoints";
import { Card, Grid } from "@mui/material";

import WorkOrderAttachmentIndex from "./index";

function WorkOrderAttachmentUpload({
  id,
  doGet,
  appError,
  doPut,
  doPost,
  doPostFormData,
  appInfo,
  appSuccess,
}) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const loadInitForm = async () => {
    const params = {
      url: endPoints.transactions.workOrderAttachment.base,
      data: { id: id || "" },
    };

    const response = await doGet(params);
    return response.response.data;
  };

  const init = async () => {
    try {
      const formData = await loadInitForm();
    } catch (error) {
      appError(messages.dataFetch.fail);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    formData.append("id", id);
    files.forEach((file) => {
      formData.append("files[]", file.file, file.name);
    });

    const params = {
      url: `work_order_attachment`,
      data: formData,
    };

    try {
      // Enviamos el FormData usando el método postFormData de ApiServiceFetch
      const response = await doPostFormData(params);
      console.log("Carga de archivos", response);
      setConfirm(true);
      appSuccess("Archivos subidos exitosamente");
      handleRemoveAll();
    } catch (error) {
      console.error("Error en la subida de archivos:", error);
      appError("Error en la subida de archivos.");
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <WorkOrderAttachmentIndex id={id} confirm={confirm} />
        </Grid>
        <Grid item xs={6}>
          <UploadMultiFile
            title={`Cargar adjuntos a la producción`}
            message={`Arrastre y suelte los archivos o haga click en esta área para 
        seleccionarlos desde su equipo, todas las extensiones son permitidas`}
            showPreview={false}
            error={error}
            files={files}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
            onDrop={handleFileDrop}
            onUpload={handleUpload}
          />
          {Boolean(confirm) && (
            <ConfirmModal
              open
              title={"Fin del Proceso"}
              message={
                "Los archivos han sido procesados completamente, verifique el listado de errores"
              }
              onClose={() => setConfirm(null)}
              onAccept={() => setConfirm(null)}
              // createPermissions={permissions.createPermissions}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

WorkOrderAttachmentUpload.propTypes = {
  doPut: PropTypes.func,
  doPost: PropTypes.func,
  doPostFormData: PropTypes.func,
  doGet: PropTypes.func,
  appInfo: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
};

export default withApi(withNotification(WorkOrderAttachmentUpload));
