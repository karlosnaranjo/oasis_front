import React, { useState, useEffect } from 'react';
import { Button, DialogTitle, Dialog, DialogActions, DialogContent, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { withApi, withNotification } from 'wrappers';
import { Table, Loader } from 'components';
import endPoints from 'endPoints/endPoints';
import messages from 'constantes/messages';
import masterMessages from 'constantes/masterMessages';

const initState = {
  rows: [],
  isLoading: true
};

const PermissionList = ({
  id,
  doPost,
  doGet,
  genericException,
  appSuccess,
  setOpenModal,
  refreshTable
}) => {
  const [state, setState] = useState(initState);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const init = async () => {
      const params = {
        url: `${endPoints.seguridad.rolesPermission.getPermission}/${id}`
      };
      try {
        const permisos = await doGet(params);
        setState({
          rows: permisos,
          isLoading: false
        });
      } catch (error) {
        genericException(error);
      }
    };
    init();
  }, [genericException, id, doGet]);

  // Save the rows selected in the modal
  const onSelectedRows = (dataRows) => {
    setSelectedRows(dataRows);
  };

  // Call to API for create new records selected in modal products
  const createProducts = async () => {
    const values = [];
    selectedRows.forEach((row) => {
      values.push(row.name);
    });

    const params = {
      url: endPoints.seguridad.rolesPermission.base,
      data: {
        roleId: id,
        permissions: values
      }
    };

    try {
      await doPost(params);
      refreshTable();
      setOpenModal();
      appSuccess(messages.crud.new);
    } catch (error) {
      genericException(error);
    }
  };

  const { isLoading, rows } = state;
  const { title } = masterMessages.seguridad.rolPermission;

  const columnsModalProducts = [
    { name: 'name', label: 'Permiso' },
    { name: 'description', label: 'Modulo' },
  ];
  return (
    <Dialog open onClose={setOpenModal} fullWidth maxWidth="lg">
      {isLoading ? (
        <Box p={10}>
          <Loader />
        </Box>
      ) : (
        <>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <Table data={rows} columns={columnsModalProducts} onRowsSelect={onSelectedRows} />
          </DialogContent>
          <DialogActions>
            <Button disabled={!(selectedRows.length > 0)} variant="contained" onClick={createProducts}>
              Seleccionar
            </Button>
            <Button variant="contained" onClick={setOpenModal}>
              Cancelar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

PermissionList.propTypes = {
  id: PropTypes.string.isRequired,
  refreshTable: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
  doPost: PropTypes.func,
  doGet: PropTypes.func
};

export default withApi(withNotification(PermissionList));
