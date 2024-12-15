import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { withApi, withNotification } from "wrappers";
import { ConfirmModal } from "components/dialogs";
import { DefaultActions, Table, EstadoChip } from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import masterMessages from "constantes/masterMessages";
import TargetsForm from './Form';
import { getStatusLabel } from "utils/formHelpers";

const permissions = {
  createPermissions: "general:masters:targets:create",
  updatePermissions: "general:masters:targets:update",
  deletePermissions: "general:masters:targets:delete",
  changeStatusPermissions: "general:masters:targets:changeStatus",
};

const TargetsGrid = ({
  id,
  doDelete,
  appWarning,
  genericException,
  editable,
}) => {
  const [idToRemove, setIdToRemove] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const phase_id = id;
  console.log(phase_id);
  const [openModal, setOpenModal] = useState(false);
  const child = useRef(null);

  const openModalDelete = (idModel) => setIdToRemove(idModel);
  const closeModalDelete = () => setIdToRemove(null);

  const refreshTabletargets = () =>  child.current.refresh();

  const onDelete = async () => {
    const params = {
      url: `${endPoints.masters.targets.base}/${idToRemove}`
    };
    try {
      await doDelete(params);
      refreshTabletargets();
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
    masterMessages.masters.targets;

  const columns = [
		{ name: 'code', label: 'Codigo' },
		{ name: 'name', label: 'Nombre fase' },

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
        <TargetsForm
          id={idToUpdate}
          phase_id={phase_id}
          setOpenModal={closeModalUpdate}
          refreshTable={refreshTabletargets}
          editable={editable}
        />
      )}
      <Table
        forwardedRef={child}
        serverSideUrl={endPoints.masters.targets.base}
        serverSideData={{ where: `phase_id=${phase_id}` }}
        onCreate={openModalForm}
        columns={columns}
        createPermissions={permissions.createPermissions}
      />
    </>
  );
};

TargetsGrid.propTypes = {
    appWarning: PropTypes.func.isRequired,
    genericException: PropTypes.func.isRequired,
    doDelete: PropTypes.func,
    doGet: PropTypes.func,
    editable: PropTypes.bool,
};

export default withApi(withNotification(TargetsGrid)); 