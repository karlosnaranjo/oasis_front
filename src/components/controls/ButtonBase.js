import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

/**
 * This component allows to render a button with the specific go backaction.
 * @param {*} param0
 */
const ButtonBase = ({ className, style, label = '', onClick, Icon = <></>, ...rest }) => (
  <Button className={className} style={style} variant="contained" onClick={() => onClick()} startIcon={Icon} {...rest}>
    {label}
  </Button>
);

ButtonBase.propTypes = {
  className: PropTypes.string,
  Icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.shape()
};

ButtonBase.defaultProps = {
  className: '',
  style: {}
};

export default ButtonBase;
