import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { dotNotationExtractor, isFunction } from 'utils/functions';
import { formatter, DEFAULT_MUI_DATATABLE_BUTTON_SIZE } from 'constantes/constants';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

function Row({ columns, data = {}, openExpandable, expanded }) {
  return (
    <TableRow>
      <TableCell>
        <IconButton onClick={openExpandable} size={DEFAULT_MUI_DATATABLE_BUTTON_SIZE}>
          {expanded ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
        </IconButton>
      </TableCell>
      {columns.map((col, index) => {
        let cellContent = col.component || dotNotationExtractor(data, col.name);
        cellContent = isFunction(cellContent) ? cellContent(data) : cellContent;
        cellContent = col.type === 'number' ? formatter.format(cellContent ?? 0) : cellContent;
        return (
          !col.hide && (
            <TableCell
              key={`Col${String(index)}`}
              align={col.align || 'left'}
              style={{ width: col.width ? col.width : '' }}
            >
              {cellContent}
            </TableCell>
          )
        );
      })}
    </TableRow>
  );
}

Row.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.array]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object]),
  openExpandable: PropTypes.func,
  expanded: PropTypes.bool
};

export default Row;
