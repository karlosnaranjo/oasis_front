import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, TableSortLabel, Checkbox } from '@mui/material';

const styles = {
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
};

function Header({ columns, orderBy, order, setOrderBy }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={false}
            checked={false}
            // onChange={onSelectAllClick}
          />
        </TableCell>
        {columns.map((row, index) => {
          const indice = index;
          return (
            <TableCell
              key={indice}
              align={row.align || 'left'}
              sortDirection={orderBy === row.name ? order : false}
              style={{ width: row.width ? row.width : '' }}
            >
              <TableSortLabel
                active={orderBy === row.name}
                direction={orderBy === row.name ? order : 'asc'}
                onClick={() => setOrderBy(row.name)}
              >
                {row.label}
                {orderBy === row.name ? (
                  <span style={styles.visuallyHidden}>
                    {order === 'desc' ? 'ordenar descendientemente' : 'ordenar ascendentemente'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

Header.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.array]).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  setOrderBy: PropTypes.func
};

export default Header;
