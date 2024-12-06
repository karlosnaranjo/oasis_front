import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { PageGeneral, DefaultActions, EstadoChip, Table } from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import { withApi, withNotification } from "wrappers";
import { ConfirmModal } from "components/dialogs";
import masterMessages from "constantes/masterMessages";
import Form from "./Form";
import { getStatusLabel } from "utils/formHelpers";

const {
  transactions: {
    workOrders: {
      title,
      deleteTitle,
      deleteMessage,
      changeStatusTitle,
      changeStatusMessage,
    },
  },
} = masterMessages;

const permissions = {
  createPermissions: "general:transactions:workOrders:create",
  updatePermissions: "general:transactions:workOrders:update",
  deletePermissions: "general:transactions:workOrders:delete",
  changeStatusPermissions: "general:transactions:workOrders:changeStatus",
};

function WorkOrders(props) {
  const [idToEdit, setIdToEdit] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idChangeStatus, setIdChangeStatus] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const tableRef = useRef(null);

  const onDelete = async () => {
    const url = `${endPoints.transactions.workOrders.base}/${idToDelete}`;
    try {
      await props.doDelete({ url });
      tableRef.current.refresh();
      closeModalDelete();
      props.appWarning(messages.crud.delete);
    } catch (error) {
      props.appError(messages.crud.fail);
    } finally {
      setIdToDelete(null);
    }
  };

  const onChangeStatus = async () => {
    const url = `${endPoints.transactions.workOrders.base}/changestatus/${idChangeStatus}`;
    try {
      await props.doPut({ url });
      props.appWarning(messages.crud.changeStatus);
      tableRef.current.refresh();
    } catch (error) {
      props.appError(messages.crud.fail);
    } finally {
      setIdChangeStatus(null);
    }
  };

  useEffect(() => {
    if (!openModal) {
      setIdToEdit(null);
    }
  }, [openModal]);

  const breadcrumbs = [{ label: "Transacciones" }, { label: title }];

  const baseUrl = "/app/general/transactions/work_orders";
  const navigate = useNavigate();

  const redirectEdit = (idModel) => {
    navigate(`${baseUrl}/edit/${idModel}`, { replace: true, id: idModel });
  };

  const redirectNew = () => {
    navigate(`${baseUrl}/new`, { replace: false });
  };

  const openModalDelete = ({ id: idToDelete } = {}) =>
    setIdToDelete(idToDelete);
  const closeModalDelete = () => setIdToDelete(null);

  const actions = (row) => (
    <DefaultActions
      row={row}
      onEdit={() => redirectEdit(row.id)}
      onDelete={() => openModalDelete(row)}
      onChangeStatus={() => setIdChangeStatus(row.id)}
    />
  );
  const columns = [
    { name: "order_number", label: "Orden No." },
    { name: "issue_date", label: "Fecha Elaboración" },
    { name: "due_date", label: "Fecha Est. Entrega" },
    { name: "description", label: "Descripción" },
    { name: "third_party.name", label: "Cliente", filter: false },
    { name: "product.description", label: "Producto", filter: false },
    { name: "instructions", label: "Instrucciones" },
    { name: "tag.description", label: "Tag", filter: false },
    {
      label: "Estado",
      filter: false,
      component: (row) => <EstadoChip estado={getStatusLabel(row.status)} />,
    },
    {
      name: "acciones",
      width: 130,
      align: "right",
      label: "Acciones",
      filter: false,
      component: (row) => actions(row),
    },
  ];

  return (
    <PageGeneral title={title} breadcrumbs={breadcrumbs}>
      {Boolean(idToDelete) && (
        <ConfirmModal
          open
          title={deleteTitle}
          message={deleteMessage}
          onClose={() => setIdToDelete(null)}
          onAccept={() => onDelete()}
          createPermissions={permissions.deletePermissions}
        />
      )}
      {Boolean(idChangeStatus) && (
        <ConfirmModal
          open
          title={changeStatusTitle}
          message={changeStatusMessage}
          onClose={() => setIdChangeStatus(null)}
          onAccept={() => onChangeStatus()}
          createPermissions={permissions.changeStatusPermissions}
        />
      )}
      {openModal && (
        <Form
          id={idToEdit}
          setOpenModal={setOpenModal}
          refreshData={tableRef}
        />
      )}
      <Table
        forwardedRef={tableRef}
        onCreate={() => redirectNew()}
        serverSideUrl={endPoints.transactions.workOrders.base}
        columns={columns}
        title={title}
        createPermissions={permissions.createPermissions}
      />
    </PageGeneral>
  );
}

WorkOrders.propTypes = {
  appWarning: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
  doDelete: PropTypes.func,
  doGet: PropTypes.func,
};

export default withApi(withNotification(WorkOrders));
