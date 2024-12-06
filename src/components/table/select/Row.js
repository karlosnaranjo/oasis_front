import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Checkbox } from '@mui/material';
import { dotNotationExtractor, isFunction } from 'utils/functions';
import { formatter } from 'constantes/constants';

function Row({ columns, data = {}, checked = false, setCheck }) {
  return (
    <TableRow hover onClick={() => setCheck(data)} selected={checked}>
      <TableCell padding="checkbox">
        <Checkbox checked={checked} disabled={data.selectable ? Boolean(data.selectable) : false} />
      </TableCell>
      {columns.map((col, index) => {
        let cellContent = col.component || dotNotationExtractor(data, col.name);
        cellContent = isFunction(cellContent) ? cellContent(data) : cellContent;
        cellContent = col.type === 'number' ? formatter.format(cellContent ?? 0) : cellContent;
        return (
          <TableCell
            key={`Col${String(index)}`}
            align={col.align || 'left'}
            style={{ width: col.width ? col.width : '' }}
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
  checked: PropTypes.bool,
  setCheck: PropTypes.func
};

export default Row;
