import React from "react";
import PropTypes from "prop-types";
import {
  UpdateButton,
  DeleteButton,
  ChangeStatusButton,
  PrintButton,
} from "components/controls";

const DefaultActions = ({
  row,
  onEdit,
  onDelete,
  onChangeStatus,
  onPrint,
  children,
  updatePermissions = "",
  deletePermissions = "",
  changeStatusPermissions = "",
  printPermissions = "",
  disabledUpdate,
  disabledDelete,
  disabledPrint,
}) => (
  <>
    {onEdit && (
      <UpdateButton
        onClick={() => onEdit(row)}
        requiredPermissions={updatePermissions}
        disabled={disabledUpdate}
      />
    )}
    {onDelete && (
      <DeleteButton
        onClick={() => onDelete(row)}
        requiredPermissions={deletePermissions}
        disabled={disabledDelete}
      />
    )}
    {onChangeStatus && (
      <ChangeStatusButton
        onClick={() => onChangeStatus(row)}
        requiredPermissions={changeStatusPermissions}
        disabled={disabledDelete}
      />
    )}
    {onPrint && (
      <PrintButton
        onClick={() => onPrint(row)}
        requiredPermissions={printPermissions}
        disabled={disabledPrint}
      />
    )}
    {children}
  </>
);

DefaultActions.propTypes = {
  // Data del registro a retornar
  row: PropTypes.oneOfType([PropTypes.object]),
  // Funcion para el UpdateButton
  onEdit: PropTypes.func,
  // Funcion para el DeleteButton
  onDelete: PropTypes.func,
  // Funcion para el ChangeStatusButton
  onChangeStatus: PropTypes.func,
  // Funcion para el PrintButton
  onPrint: PropTypes.func,
  // Componentes adicionales
  children: PropTypes.node,
  // Permisos para editar
  updatePermissions: PropTypes.string,
  // Permisos para eliminar
  deletePermissions: PropTypes.string,
  // Permisos para cambiar estado
  changeStatusPermissions: PropTypes.string,
  // Permisos para Imprimir
  printPermissions: PropTypes.string,

  disabledUpdate: PropTypes.bool,
  disabledDelete: PropTypes.bool,
  disabledPrint: PropTypes.bool,
};

export default DefaultActions;
