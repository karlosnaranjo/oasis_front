import React from 'react';
import PropTypes from 'prop-types';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@mui/material';

const ButtonSave = ({ className, style, disabled, label = 'Guardar', ...rest }) => (
  <Button
    className={className}
    style={style}
    variant="contained"
    type="submit"
    color="primary"
    disabled={disabled}
    startIcon={<SaveIcon />}
    {...rest}
  >
    {label}
  </Button>
);

ButtonSave.defaultProps = {
  className: '',
  style: {},
  disabled: false
};

ButtonSave.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.shape()
};

export default ButtonSave;
