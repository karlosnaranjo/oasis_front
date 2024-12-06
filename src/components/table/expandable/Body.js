import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, CircularProgress, TableRow, TableCell, Grid, Typography } from '@mui/material';
import Row from './Row';

function Body({ columns, data, isLoading, expandable }) {
  const [expandible, setExpandible] = React.useState(null);
  return (
    <TableBody>
      {isLoading || !Array.isArray(data) || data.length === 0 ? (
        <TableRow>
          <TableCell colSpan={columns.length + 1}>
            <Grid style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
              {isLoading && <CircularProgress color="secondary" />}
              {!isLoading && <Typography>No hay datos para mostrar...</Typography>}
            </Grid>
          </TableCell>
        </TableRow>
      ) : (
        Array.isArray(data) &&
        data.map((row, index) => (
          <React.Fragment key={`F${String(index)}`}>
            <Row
              key={`R${String(index)}`}
              columns={columns}
              data={row}
              openExpandable={() => setExpandible(index === expandible ? null : index)}
              expanded={expandible === index}
            />
            {expandible === index && (
              <TableRow key={`ER${String(index)}`}>
                <TableCell colSpan={columns.length + 1} key={`EC${String(index)}`}>
                  {expandable(row)}
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))
      )}
    </TableBody>
  );
}

Body.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.array]).isRequired,
  data: PropTypes.oneOfType([PropTypes.array]),
  isLoading: PropTypes.bool,
  expandable: PropTypes.func
};

export default Body;
