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
  masters: {
    employees: {
      title,
      deleteTitle,
      deleteMessage,
      changeStatusTitle,
      changeStatusMessage,
    },
  },
} = masterMessages;

const permissions = {
  createPermissions: "general:masters:employees:create",
  updatePermissions: "general:masters:employees:update",
  deletePermissions: "general:masters:employees:delete",
  changeStatusPermissions: "general:masters:employees:changeStatus",
};

const EmployeesGrid = (props) => {
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [idChangeStatus, setIdChangeStatus] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const tableRef = useRef(null);

    const onDelete = async () => {
        const url = `${endPoints.masters.employees.base}/${idToDelete}`;
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
        const url = `${endPoints.masters.employees.base}/changestatus/${idChangeStatus}`;
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

    const breadcrumbs = [{ label: "masters" }, { label: title }];

    const baseUrl = "/app/general/masters/employees";
    const navigate = useNavigate();

    const redirectNew = () => {
        navigate(`${baseUrl}/new`, { replace: false });
    };

    const redirectEdit = (idModel) => {
        navigate(`${baseUrl}/edit/${idModel}`, { replace: true, id: idModel });
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
		{ name: 'document_type', label: 'Tipo de documento' },
		{ name: 'code', label: 'Numero' },
		{ name: 'name', label: 'Nombres' },
		{ name: 'image', label: 'Imagen' },
		{ name: 'gender', label: 'Genero' },
		{ name: 'date_of_birth', label: 'Fecha de Nacimiento' },
		{ name: 'address1', label: 'Direccion 1' },
		{ name: 'address2', label: 'Direccion 2' },
		{ name: 'phone', label: 'Telefono' },
		{ name: 'cellphone', label: 'Celular' },
		{ name: 'email', label: 'E-Mail' },
		{ name: 'job_title', label: 'Cargo' },

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
        <PageGeneral breadcrumbs={breadcrumbs}>
            {Boolean(idToDelete) && (
                <ConfirmModal
                    open
                    title={deleteTitle}
                    message={deleteMessage}
                    onClose={closeModalDelete}
                    onAccept={onDelete}
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
                onCreate={redirectNew}
                serverSideUrl={endPoints.masters.employees.base}
                columns={columns}
                title={title}
                createPermissions={permissions.createPermissions}
            />
        </PageGeneral>
    );
};

EmployeesGrid.propTypes = {
    appWarning: PropTypes.func.isRequired,
    genericException: PropTypes.func.isRequired,
    doDelete: PropTypes.func,
    doGet: PropTypes.func
};

export default withApi(withNotification(EmployeesGrid));