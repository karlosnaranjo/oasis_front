import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withApi, withNotification } from "wrappers";
import { ConfirmModal } from "components/dialogs";
import { DefaultActions, Table, EstadoChip } from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import masterMessages from "constantes/masterMessages";
import WorkOrderAttachmentUpload from "./Upload";
import WorkOrderAttachmentForm from "./Form";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const WorkOrderAttachmentIndex = ({
  id,
  doDelete,
  confirm,
  appWarning,
  genericException,
  editable,
  doGetFile,
}) => {
  const [idToRemove, setIdToRemove] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openUpload, setOpenModalUpload] = useState(false);

  const child = useRef(null);
  const work_order_id = id;

  const [attachmentLevel, setAttachmentLevel] = useState("all");

  const openModalDelete = (idModel) => setIdToRemove(idModel);

  const closeModalDelete = () => setIdToRemove(null);

  const refreshTableWorkOrderAttachment = () => child.current.refresh();

  useEffect(() => {
    refreshTableWorkOrderAttachment();
  }, [confirm, attachmentLevel]);

  const handleFileLinkClick = async (e, path) => {
    e.preventDefault();

    const params = {
      url: `work_order_attachment/get_file/${path}`, // Solo la ruta relativa
    };
    try {
      const response = await doGetFile(params);
      const blob = await response.blob();

      // Crear un objeto URL para el blob
      const fileUrl = URL.createObjectURL(blob);

      // Abrir una nueva ventana con el archivo
      window.open(fileUrl);
    } catch (error) {
      console.error("Error fetching file:", error);
      // Manejar errores
    }

    // Llamada al endpoint que sirve el archivo
    fetch(
      `${process.env.REACT_APP_API_SERVER}${process.env.REACT_APP_API_VERSION}work_order_attachment/get_file/${path}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.blob())
      .then((blob) => {
        // Crear un objeto URL para el blob
        const fileUrl = URL.createObjectURL(blob);
        // Abrir una nueva ventana con el archivo
        window.open(fileUrl);
      })
      .catch((error) => {
        console.error("Error fetching file:", error);
        // Manejar errores
      });
  };

  const onDelete = async () => {
    const params = {
      url: `${endPoints.transactions.workOrderAttachment.base}/${idToRemove}`,
    };
    try {
      await doDelete(params);
      refreshTableWorkOrderAttachment();
      closeModalDelete();
      appWarning(messages.crud.delete);
    } catch (error) {
      genericException(error);
    }
  };

  const openModalForm = (id = null) => {
    setIdToUpdate(id);
    setOpenModal(true);
  };

  const closeModalUpdate = () => {
    setOpenModal(false);
    setIdToUpdate(null);
  };

  const openModalUpload = () => {
    setOpenModalUpload(true);
  };

  const closeModalUpload = () => {
    setOpenModalUpload(false);
  };

  const acciones = (row) => {
    const { id } = row;
    return (
      <DefaultActions
        onEdit={() => openModalForm(id)}
        onDelete={() => openModalDelete(id)}
        row={row}
      />
    );
  };

  const { deleteTitle, deleteMessage } = masterMessages.transactions.workOrders;

  const columns = [
    {
      name: "acciones",
      label: "Acciones",
      filter: false,
      width: "20%",
      component: (row) => acciones(row),
    },
    {
      label: "Título y Descripción",
      filter: false,
      component: (row) => (
        <div>
          <p
            style={{
              fontWeight: "bold",
              color: row.is_default_file ? "blue" : "inherit",
            }}
          >
            <a
              href="#"
              onClick={(e) => handleFileLinkClick(e, row.file_path)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {row.title}
            </a>
          </p>
          <p>{row.description}</p>
        </div>
      ),
    },
  ];
  return (
    <>
      {Boolean(idToRemove) && (
        <ConfirmModal
          open
          title={deleteTitle}
          message={deleteMessage}
          onClose={closeModalDelete}
          onAccept={onDelete}
        />
      )}
      {Boolean(openUpload) && (
        <WorkOrderAttachmentUpload
          id={work_order_id}
          setOpenModal={closeModalUpload}
          refreshTable={refreshTableWorkOrderAttachment}
          editable={editable}
        />
      )}
      {Boolean(openModal) && (
        <WorkOrderAttachmentForm
          id={idToUpdate}
          work_order_id={work_order_id}
          setOpenModal={closeModalUpdate}
          refreshTable={refreshTableWorkOrderAttachment}
          editable={editable}
        />
      )}
      <>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button onClick={() => setAttachmentLevel("all")}>Todos</Button>
          <Button onClick={() => setAttachmentLevel("product")}>
            Producto
          </Button>
        </ButtonGroup>
      </>
      <Table
        forwardedRef={child}
        serverSideUrl={endPoints.transactions.workOrderAttachment.base}
        serverSideData={{ id: id, level: attachmentLevel }}
        //onCreate={openModalUpload}
        columns={columns}
        //title={masterMessages.transactions.workOrders.attachments}
        style={{ height: "60%", width: "100%" }}
      />
    </>
  );
};

WorkOrderAttachmentIndex.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  appWarning: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
  doDelete: PropTypes.func,
  doGetFile: PropTypes.func,
  refreshCompra: PropTypes.func,
  editable: PropTypes.bool,
};

export default withApi(withNotification(WorkOrderAttachmentIndex));
