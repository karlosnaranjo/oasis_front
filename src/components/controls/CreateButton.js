import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import AddCircle from '@mui/icons-material/AddCircleOutline';
import useAuth from 'hooks/useAuth';

const CreateButton = ({ onClick, requiredPermissions = '', disabled, ...rest }) => {
  const { checkAccess } = useAuth();
  return (
    <IconButton
      sx={{
        '&:hover': (theme) => ({
          color: theme.palette.primary.main
        })
      }}
      onClick={() => onClick()}
      disabled={!checkAccess(requiredPermissions) || disabled}
      {...rest}
    >
      <AddCircle />
    </IconButton>
  );
};

CreateButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  checkAccess: PropTypes.func,
  requiredPermissions: PropTypes.string
};

export default CreateButton;
