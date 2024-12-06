import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { DEFAULT_MUI_DATATABLE_BUTTON_SIZE } from 'constantes/constants';
import PrintIcon from '@mui/icons-material/Print';
import useAuth from 'hooks/useAuth';

const PrintButton = ({ onClick, requiredPermissions = [], disabled, ...rest }) => {
  const { checkAccess } = useAuth();
  return (
    <IconButton
      size={DEFAULT_MUI_DATATABLE_BUTTON_SIZE}
      sx={{
        '&:hover': (theme) => ({
          color: theme.palette.primary.main
        })
      }}
      onClick={onClick}
      disabled={!checkAccess(requiredPermissions) || disabled}
      {...rest}
    >
      <PrintIcon />
    </IconButton>
  );
};

PrintButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  checkAccess: PropTypes.func,
  requiredPermissions: PropTypes.arrayOf(PropTypes.string)
};

export default PrintButton;
