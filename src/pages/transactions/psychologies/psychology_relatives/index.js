import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { withApi, withNotification } from "wrappers";
import { ConfirmModal } from "components/dialogs";
import { DefaultActions, Table, EstadoChip } from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import masterMessages from "constantes/masterMessages";
import PsychologyRelativesForm from './Form';
import { getStatusLabel } from "utils/formHelpers";

const permissions = {
  createPermissions: "general:transactions:psychology_relatives:create",
  updatePermissions: "general:transactions:psychology_relatives:update",
  deletePermissions: "general:transactions:psychology_relatives:delete",
  changeStatusPermissions: "general:transactions:psychology_relatives:changeStatus",
};

const PsychologyRelativesGrid = ({
  id,
  doDelete,
  appWarning,
  genericException,
  editable,
}) => {
  const [idToRemove, setIdToRemove] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const psychology_id = id;
  const [openModal, setOpenModal] = useState(false);
  const child = useRef(null);

  const openModalDelete = (idModel) => setIdToRemove(idModel);
  const closeModalDelete = () => setIdToRemove(null);

  const refreshTablepsychologyRelatives = () =>  child.current.refresh();

  const onDelete = async () => {
    const params = {
      url: `${endPoints.transactions.psychologyRelatives.base}/${idToRemove}`
    };
    try {
      await doDelete(params);
      refreshTablepsychologyRelatives();
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
    masterMessages.transactions.psychologyRelatives;

  const columns = [
		{ name: 'name', label: 'Nombres y Apellidos' },
		{ name: 'relative_name', label: 'Parentesco' },
		{ name: 'age', label: 'Edad' },
		{ name: 'relationship_type', label: 'Tipo de relacion' },

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
    }
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
          createPermissions={permissions.deletePermissions}
        />
      )}
      {Boolean(openModal) && (
        <PsychologyRelativesForm
          id={idToUpdate}
          psychology_id={psychology_id}
          setOpenModal={closeModalUpdate}
          refreshTable={refreshTablepsychologyRelatives}
          editable={editable}
        />
      )}
      <Table
        forwardedRef={child}
        serverSideUrl={endPoints.transactions.psychologyRelatives.base}
        serverSideData={{ where: `psychology_id=${psychology_id}` }}
        onCreate={openModalForm}
        columns={columns}
        createPermissions={permissions.createPermissions}
      />
    </>
  );
};

PsychologyRelativesGrid.propTypes = {
    appWarning: PropTypes.func.isRequired,
    genericException: PropTypes.func.isRequired,
    doDelete: PropTypes.func,
    doGet: PropTypes.func,
    editable: PropTypes.bool,
};

export default withApi(withNotification(PsychologyRelativesGrid)); 