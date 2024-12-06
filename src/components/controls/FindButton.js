import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import FindInPageIcon from '@mui/icons-material/FindInPage';

const FindButton = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <Tooltip title="Filtros avanzados">
      <FindInPageIcon />
    </Tooltip>
  </IconButton>
);

FindButton.propTypes = {
  onClick: PropTypes.func
};

export default FindButton;
