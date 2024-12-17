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
        psychologies: {
            title,
            deleteTitle,
            deleteMessage,
            changeStatusTitle,
            changeStatusMessage,
        },
    },
} = masterMessages;

const permissions = {
    createPermissions: "general:transactions:psychologies:create",
    updatePermissions: "general:transactions:psychologies:update",
    deletePermissions: "general:transactions:psychologies:delete",
    changeStatusPermissions: "general:transactions:psychologies:changeStatus",
};

const PsychologiesGrid = (props) => {
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [idChangeStatus, setIdChangeStatus] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const tableRef = useRef(null);

    const onDelete = async () => {
        const url = `${endPoints.transactions.psychologies.base}/${idToDelete}`;
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
        const url = `${endPoints.transactions.psychologies.base}/changestatus/${idChangeStatus}`;
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

    const baseUrl = "/app/general/transactions/psychologies";
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
        { name: 'patient_name', label: 'Paciente' },
        { name: 'code', label: 'Codigo' },
        { name: 'issue_date', label: 'Fecha de Elaboración' },
        //	{ name: 'reason_of_visit', label: 'Motivo de consulta' },
        //	{ name: 'family_history', label: 'Antecedentes familiares' },
        //	{ name: 'work_history', label: 'Antecedentes laborales' },
        //	{ name: 'personal_history', label: 'Historia personal' },
        //	{ name: 'addiction_history', label: 'Historia de adiccion' },
        //	{ name: 'way_administration', label: 'Via de administracion' },
        //	{ name: 'other_substances', label: 'Otras subtancias' },
        //	{ name: 'highest_substance', label: 'Mayor sustancia' },
        //	{ name: 'current_consumption', label: 'Consumo actual' },
        //	{ name: 'addictive_behavior', label: 'Esta realizando la conducta adictiva?' },
        //	{ name: 'previous_treatment', label: 'Tratamientos anteriores' },
        //	{ name: 'place_treatment', label: 'Lugares y tiempos de tratamiento' },
        //	{ name: 'mental_illness', label: 'Historia de enfermedad mental' },
        //	{ name: 'suicidal_thinking', label: 'Ha tenido pensamientos o intentos de suicidio?' },
        //	{ name: 'homicidal_attempts', label: 'Ha tenido pensamientos o intentos homicidas?' },
        //	{ name: 'language', label: 'Lenguaje y pensamiento' },
        //	{ name: 'orientation', label: 'Orientacion (Persona, espacio y tiempo):' },
        //	{ name: 'memory', label: 'Memoria' },
        //	{ name: 'mood', label: 'Estado de animo' },
        //	{ name: 'feeding', label: 'Alimentacion' },
        //	{ name: 'sleep', label: 'Sueno' },
        //	{ name: 'medication', label: 'Esta tomando algun tipo de medicamento?' },
        //	{ name: 'legal_issues', label: 'Problematicas judiciales y/o comportamentales' },
        //	{ name: 'defense_mechanism', label: 'Mecanismos de defensa' },
        //	{ name: 'another_difficulty', label: 'Otras dificultades' },
        //	{ name: 'expectation', label: 'Que expectativas y motivaciones tiene para el proceso?' },
        //	{ name: 'diagnostic_impression', label: 'Impresion diagnostica' },
        //	{ name: 'intervention', label: 'Propuesta de intervencion' },
        //	{ name: 'comments', label: 'Observaciones' },
        //	{ name: 'employee_name', label: 'Funcionario' },

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
                serverSideUrl={endPoints.transactions.psychologies.base}
                columns={columns}
                title={title}
                createPermissions={permissions.createPermissions}
            />
        </PageGeneral>
    );
};

PsychologiesGrid.propTypes = {
    appWarning: PropTypes.func.isRequired,
    genericException: PropTypes.func.isRequired,
    doDelete: PropTypes.func,
    doGet: PropTypes.func
};

export default withApi(withNotification(PsychologiesGrid));