import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withApi, withNotification } from 'wrappers';
import { ConfirmModal } from 'components/dialogs';
import { DefaultActions, Table } from 'components';
import endPoints from 'endPoints/endPoints';
import messages from 'constantes/messages';
import masterMessages from 'constantes/masterMessages';
import PermissionList from './PermissionList';


const TablePermission = ({
  id: id,
  doDelete,
  appWarning,
  genericException
}) => {
  const [idToRemove, setIdToRemove] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const child = useRef(null);

  const openModalDelete = (id) => setIdToRemove(id);

  const closeModalDelete = () => setIdToRemove(null);

  const closeModalUpdate = () => {
    setOpenModal(false);
    setIdToUpdate(null);
  };

  const openModalUpdate = (id = null) => {
    setOpenModal(true);
    setIdToUpdate(id);
  };

  const refreshTableMateriales = () => child.current.refresh();

  // Call to API for delete record selected in the table
  const onDelete = async () => {
    const params = {
      url: `${endPoints.seguridad.rolesPermission.base}`,
      data: { name: idToRemove}
    };
    try {
      await doDelete(params);
      refreshTableMateriales();
      closeModalDelete();
      appWarning(messages.crud.delete);
    } catch (error) {
      genericException(error);
    }
  };
  const { deleteTitle, deleteMessage } = masterMessages.presolped.presolped;

  const columns = [
    { name: 'name', label: 'Permiso' },
    { name: 'description', label: 'Modulo' },
    {
      name: 'acciones',
      label: 'Acciones',
      filter: false,
      component: (row) => {
        const { name } = row;
        return (
          <DefaultActions
            onDelete={() => openModalDelete(name)}
            row={row}
          />
        );
      }
    }
  ];
  return (
    <>
      {Boolean(idToRemove) && (
        <ConfirmModal open title={deleteTitle} message={deleteMessage} onClose={closeModalDelete} onAccept={onDelete} />
      )}
      {Boolean(openModal) && (
        <PermissionList
          id={idToUpdate}
          setOpenModal={closeModalUpdate}
          refreshTable={refreshTableMateriales}
        />
      )}
      <Table
        forwardedRef={child}
        serverSideUrl={`${endPoints.seguridad.rolesPermission.base}/${id}`}
        serverSideData={{ id }}
        onCreate={() => openModalUpdate(id)}
        columns={columns}
      />
    </>
  );
};

TablePermission.propTypes = {
  id: PropTypes.string.isRequired,
  appWarning: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
  doDelete: PropTypes.func,
  refreshPresolped: PropTypes.func
};

export default withApi(withNotification(TablePermission));
