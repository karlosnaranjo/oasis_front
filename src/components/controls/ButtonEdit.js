import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

/**
 * This component allows to render a button with the specific go backaction.
 * @param {*} param0
 */
const GoEditButton = ({ className, disabled, style, label = 'Editar', onEdit }) => (
  <Button
    className={className}
    disabled={disabled}
    style={style}
    variant="contained"
    onClick={() => onEdit()}
    startIcon={<EditIcon />}
  >
    {label}
  </Button>
);

GoEditButton.propTypes = {
  className: PropTypes.string,
  onEdit: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.shape()
};

GoEditButton.defaultProps = {
  className: '',
  style: {}
};

export default GoEditButton;
