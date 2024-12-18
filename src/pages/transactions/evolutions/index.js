import React, { useState, useRef, useEffect, useCallback } from "react";
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
import Avatar from "@mui/material/Avatar";
import logo from '../../../assets/logo.png';

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
    const [dataReport, setDataReport] = useState(null)

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
            onPrint={redirectPrint}
        />
    );

    const generateReportHtml = (dataReport) => {
        const currentDate = new Date()
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(currentDate.getDate()).padStart(2, '0')}`
        return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Evolución de Usuario</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
            vertical-align: top;
        }
        th {
            background-color: #f2f2f2;
        }
        h1 {
            text-align: center;
            font-size: 18px;
            margin-bottom: 10px;
        }
        .logo {
            text-align: left;
        }
        .logo img {
            width: 50px;
        }
    </style>
</head>
<body>
    <!-- Encabezado -->
    <div class="logo">
        <img src="${logo}" alt="Logo Corporación OASIS" />
    </div>
    <h1>REPORTE DE EVOLUCIÓN DE USUARIO <br> IPS CORPORACIÓN OASIS</h1>

    <!-- Tabla Dinámica -->
    <table>
        <thead>
            <tr>
                <th>ID Paciente</th>
                <th>Paciente</th>
                <th>Fecha/Hora</th>
                <th>Nota</th>
                <th>Área</th>
                <th>Empleado</th>
            </tr>
        </thead>
        <tbody>
           <tbody>
              ${dataReport
                .map(
                    (row, index) => `
                <tr>
                    <td>${row.patient_code}</td>
                    <td>${row.patient_name}</td>
                    <td>${row.date_of_evolution}</td>
                    <td>${row.comments}</td>
                    <td>${row.area}</td>
                    <td>${row.employee_name}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
        </tbody>
    </table>
</body>
</html>

            
          
    `
    }

    const loadReportData = useCallback(
        async (id) => {
            try {
                const params = {
                    url: `${endPoints.transactions.evolutions.report}/${id}`,
                    data: {}
                }
                const resp = await props.doGet(params)
                return resp
            } catch (error) {
                console.log('ERROR AL INICIAR ' + error)
                props.genericException(error)
            }
        },
        [props.genericException]
    )

    const redirectPrint = async ({ patient_id } = {}) => {
        const { evolution } = await loadReportData(patient_id)
        setDataReport(evolution)
    }

    useEffect(() => {
        if (dataReport) {
            const reportHtml = generateReportHtml(dataReport)
            const windowFeatures =
                'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600'
            const printWindow = window.open('', '_blank', windowFeatures)
            printWindow.document.write(reportHtml)
            printWindow.document.close()
            printWindow.print()
        }
    }, [dataReport])

    const columns = [
        //{ name: 'code', label: 'Codigo' },
        {
            name: "image",
            label: "Imagen",
            component: (row) => (
                <Avatar
                    alt={row.name}
                    src={row.image}
                    style={{ width: "50px", height: "50px" }}
                />
            ),
        },
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