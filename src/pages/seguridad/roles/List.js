import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { DefaultActions, Table, PageGeneral, EstadoChip } from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import masterMessages from "constantes/masterMessages";
import { withApi, withNotification } from "wrappers";
import { ConfirmModal } from "components/dialogs";
import { useNavigate } from "react-router";

const { title, deleteTitle, deleteMessage } = masterMessages.seguridad.rol;

const baseUrl = "/app/seguridad/roles";

const RolGrid = ({ doDelete, genericException, appWarning }) => {
  const navigate = useNavigate();
  const [idToDelete, setIdToDelete] = useState(null);
  const tableRef = useRef(null);

  const openModalDelete = ({ id: idToDelete } = {}) =>
    setIdToDelete(idToDelete);
  const closeModalDelete = () => setIdToDelete(null);

  const redirectNew = () => {
    navigate(`${baseUrl}/new`, { replace: true });
  };

  const redirectEdit = ({ id: idRol } = {}) => {
    navigate(`${baseUrl}/edit/${idRol}`, { replace: false });
  };

  // Call to API for remove record according with your id
  const onDelete = async () => {
    const params = {
      url: `${endPoints.seguridad.roles.base}/${idToDelete}`,
    };

    try {
      await doDelete(params);
      tableRef.current.refresh();
      closeModalDelete();
      appWarning(messages.crud.delete);
    } catch (error) {
      genericException(error);
    }
  };

  const breadcrumbs = [{ label: "Seguridad" }, { label: title }];

  const columns = [
    { name: "name", label: "Nombre" },
    {
      name: "acciones",
      label: "Acciones",
      filter: false,
      component: (row) => (
        <DefaultActions
          onEdit={redirectEdit}
          onDelete={openModalDelete}
          row={row}
        />
      ),
    },
  ];
  return (
    <PageGeneral title={title} breadcrumbs={breadcrumbs}>
      {Boolean(idToDelete) && (
        <ConfirmModal
          open
          title={deleteTitle}
          message={deleteMessage}
          onClose={closeModalDelete}
          onAccept={onDelete}
        />
      )}
      <Table
        forwardedRef={tableRef}
        onCreate={redirectNew}
        serverSideUrl={endPoints.seguridad.roles.base}
        columns={columns}
      />
    </PageGeneral>
  );
};

RolGrid.propTypes = {
  appWarning: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
  doDelete: PropTypes.func,
  doGet: PropTypes.func,
};

export default withApi(withNotification(RolGrid));
