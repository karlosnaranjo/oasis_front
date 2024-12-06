import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * This component allows to render a button with the specific go backaction.
 * @param {*} param0
 */
const GoBackButton = ({ className, style, label = 'Atrás' }) => {
  const navigate = useNavigate();
  return (
    <Button
      className={className}
      style={style}
      variant="contained"
      onClick={() => navigate(-1)}
      startIcon={<ArrowBackIcon />}
    >
      {label}
    </Button>
  );
};

GoBackButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.shape()
};

GoBackButton.defaultProps = {
  className: '',
  style: {}
};

export default GoBackButton;
