import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, CircularProgress, TableRow, TableCell, Grid, Typography } from '@mui/material';
import Row from './Row';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLoading, data, columns, setCheck, verifyExist } = this.props;
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
            <Row
              key={`R${String(index)}`}
              columns={columns}
              data={row}
              setCheck={setCheck}
              checked={verifyExist(row) >= 0}
            />
          ))
        )}
      </TableBody>
    );
  }
}

Body.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.array]).isRequired,
  data: PropTypes.oneOfType([PropTypes.array]),
  isLoading: PropTypes.bool,
  setCheck: PropTypes.func,
  verifyExist: PropTypes.func
};

export default Body;
