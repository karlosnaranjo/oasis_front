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
        evolutions: {
            title,
            deleteTitle,
            deleteMessage,
            changeStatusTitle,
            changeStatusMessage,
        },
    },
} = masterMessages;

const permissions = {
    createPermissions: "general:transactions:evolutions:create",
    updatePermissions: "general:transactions:evolutions:update",
    deletePermissions: "general:transactions:evolutions:delete",
    changeStatusPermissions: "general:transactions:evolutions:changeStatus",
};

const EvolutionsGrid = (props) => {
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [idChangeStatus, setIdChangeStatus] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const tableRef = useRef(null);

    const onDelete = async () => {
        const url = `${endPoints.transactions.evolutions.base}/${idToDelete}`;
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
        const url = `${endPoints.transactions.evolutions.base}/changestatus/${idChangeStatus}`;
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

    const breadcrumbs = [{ label: "transactions" }, { label: title }];

    const baseUrl = "/app/general/transactions/evolutions";
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
            //onDelete={() => openModalDelete(row)}
            onChangeStatus={() => setIdChangeStatus(row.id)}
        />
    );

    const columns = [
        //{ name: 'code', label: 'Codigo' },
        { name: 'patient_name', label: 'Paciente' },
        { name: 'date_of_evolution', label: 'Fecha de registro' },
        { name: 'area', label: 'Area que registra evolucion' },
        //{ name: 'comments', label: 'Notas' },
        { name: 'employee_name', label: 'Empleado' },

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
                serverSideUrl={endPoints.transactions.evolutions.base}
                columns={columns}
                title={title}
                createPermissions={permissions.createPermissions}
            />
        </PageGeneral>
    );
};

EvolutionsGrid.propTypes = {
    appWarning: PropTypes.func.isRequired,
    genericException: PropTypes.func.isRequired,
    doDelete: PropTypes.func,
    doGet: PropTypes.func
};

export default withApi(withNotification(EvolutionsGrid));