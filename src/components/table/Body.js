import React from "react";
import PropTypes from "prop-types";
import {
  TableBody,
  CircularProgress,
  TableRow,
  TableCell,
  Grid,
  Typography,
} from "@mui/material";
import Row from "./Row";

function Body({ columns, data, isLoading }) {
  return (
    <TableBody>
      {isLoading || !Array.isArray(data) || data.length === 0 ? (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Grid
              style={{ display: "flex", justifyContent: "center", margin: 10 }}
            >
              {isLoading && <CircularProgress color="secondary" />}
              {!isLoading && (
                <Typography>No hay datos para mostrar...</Typography>
              )}
            </Grid>
          </TableCell>
        </TableRow>
      ) : (
        Array.isArray(data) &&
        data.map((row, index) => (
          <Row key={`R${String(index)}`} columns={columns} data={row} />
        ))
      )}
    </TableBody>
  );
}

Body.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.array]).isRequired,
  data: PropTypes.oneOfType([PropTypes.array]),
  isLoading: PropTypes.bool,
};

export default Body;
