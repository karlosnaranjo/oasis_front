import React from 'react';
import PropTypes from 'prop-types';
import { TablePagination } from '@mui/material';

function Pagination(props) {
  const { page, rowsPerPage, total, setPage, setRowsPerPage } = props;
  return (
    <TablePagination
      rowsPerPageOptions={[10, 20, 50, 100]} // Opciones disponibles para el cambio de paginas
      component="div"
      count={total}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(event, nextPage) => setPage(nextPage)}
      onRowsPerPageChange={(event) => setRowsPerPage(event.target.value)}
    />
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  setPage: PropTypes.func,
  setRowsPerPage: PropTypes.func
};

export default Pagination;
