import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell } from "@mui/material";
import { dotNotationExtractor, isFunction } from "utils/functions";
import { formatter } from "constantes/constants";
import { getStatusLabel } from "utils/formHelpers";

function Row({ columns, data = {} }) {
  return (
    <TableRow>
      {columns.map((col, index) => {
        let cellContent = col.component || dotNotationExtractor(data, col.name);
        cellContent = isFunction(cellContent) ? cellContent(data) : cellContent;
        cellContent =
          col.type === "number"
            ? formatter.format(cellContent ?? 0)
            : cellContent;
        cellContent =
          col.name == "status" ? getStatusLabel(cellContent) : cellContent;
        return (
          <TableCell
            key={`Col${String(index)}`}
            align={col.align || "left"}
            style={{ width: col.width ? col.width : "" }}
          >
            {cellContent}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

Row.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.array]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object]),
};

export default Row;
