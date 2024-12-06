import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { withApi, withNotification } from "wrappers";
import { ConfirmModal } from "components/dialogs";
import { DefaultActions, Table, EstadoChip } from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import masterMessages from "constantes/masterMessages";
import PsychologyDrugsForm from './Form';
import { getStatusLabel } from "utils/formHelpers";

const permissions = {
  createPermissions: "general:transactions:psychology_drugs:create",
  updatePermissions: "general:transactions:psychology_drugs:update",
  deletePermissions: "general:transactions:psychology_drugs:delete",
  changeStatusPermissions: "general:transactions:psychology_drugs:changeStatus",
};

const PsychologyDrugsGrid = ({
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

  const refreshTablepsychologyDrugs = () =>  child.current.refresh();

  const onDelete = async () => {
    const params = {
      url: `${endPoints.transactions.psychologyDrugs.base}/${idToRemove}`
    };
    try {
      await doDelete(params);
      refreshTablepsychologyDrugs();
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
    masterMessages.transactions.psychologyDrugs;

  const columns = [
		{ name: 'drug_name', label: 'Sustancia' },
		{ name: 'start_age', label: 'Edad de inicio' },
		{ name: 'frecuency_of_consumption', label: 'Frecuencia de Consumo' },
		{ name: 'maximum_abstinence', label: 'Maxima abstinencia' },
		{ name: 'consumption_date', label: 'Fecha ultimo consumo' },

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
        <PsychologyDrugsForm
          id={idToUpdate}
          psychology_id={psychology_id}
          setOpenModal={closeModalUpdate}
          refreshTable={refreshTablepsychologyDrugs}
          editable={editable}
        />
      )}
      <Table
        forwardedRef={child}
        serverSideUrl={endPoints.transactions.psychologyDrugs.base}
        serverSideData={{ where: `psychology_id=${psychology_id}` }}
        onCreate={openModalForm}
        columns={columns}
        createPermissions={permissions.createPermissions}
      />
    </>
  );
};

PsychologyDrugsGrid.propTypes = {
    appWarning: PropTypes.func.isRequired,
    genericException: PropTypes.func.isRequired,
    doDelete: PropTypes.func,
    doGet: PropTypes.func,
    editable: PropTypes.bool,
};

export default withApi(withNotification(PsychologyDrugsGrid)); 