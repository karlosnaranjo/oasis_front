import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { withApi, withNotification } from "wrappers";
import { ConfirmModal } from "components/dialogs";
import { DefaultActions, Table, EstadoChip } from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import masterMessages from "constantes/masterMessages";
import WorkOrderDetailsForm from "./Form";
import { getStatusLabel } from "utils/formHelpers";

const WorkOrderDetailsGrid = ({
  id,
  doDelete,
  appWarning,
  genericException,
  editable,
}) => {
  const [idToRemove, setIdToRemove] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const work_order_id = id;
  const [openModal, setOpenModal] = useState(false);
  const child = useRef(null);

  const openModalDelete = (idModel) => setIdToRemove(idModel);

  const closeModalDelete = () => setIdToRemove(null);

  const refreshTableWorkOrderDetails = () => child.current.refresh();

  const onDelete = async () => {
    const params = {
      url: `${endPoints.transactions.workOrderDetails.base}/${idToRemove}`,
    };
    try {
      await doDelete(params);
      refreshTableWorkOrderDetails();
      closeModalDelete();
      appWarning(messages.crud.delete);
    } catch (error) {
      genericException(error);
    }
  };

  const openModalForm = (id = null) => {
    setOpenModal(true);
    setIdToUpdate(id);
  };

  const closeModalUpdate = () => {
    setOpenModal(false);
    setIdToUpdate(null);
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

  const { deleteTitle, deleteMessage } =
    masterMessages.transactions.workOrderDetails;

  const columns = [
    { name: "color.description", label: "Color" },
    { name: "size.description", label: "Talla" },
    { name: "quantity", label: "Cantidad" },
    { name: "description", label: "Descripción" },
    {
      label: "Estado",
      filter: false,
      component: (row) => <EstadoChip estado={getStatusLabel(row.status)} />,
    },
    {
      name: "acciones",
      label: "Acciones",
      filter: false,
      component: (row) => acciones(row),
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
      {Boolean(openModal) && (
        <WorkOrderDetailsForm
          id={idToUpdate}
          work_order_id={work_order_id}
          setOpenModal={closeModalUpdate}
          refreshTable={refreshTableWorkOrderDetails}
          editable={editable}
        />
      )}
      <Table
        forwardedRef={child}
        serverSideUrl={endPoints.transactions.workOrderDetails.base}
        serverSideData={{ work_order_id: id }}
        onCreate={openModalForm}
        columns={columns}
      />
    </>
  );
};

WorkOrderDetailsGrid.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  appWarning: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
  doDelete: PropTypes.func,
  refreshCompra: PropTypes.func,
  editable: PropTypes.bool,
};

export default withApi(withNotification(WorkOrderDetailsGrid));
