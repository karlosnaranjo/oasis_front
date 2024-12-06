import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { DEFAULT_MUI_DATATABLE_BUTTON_SIZE } from "constantes/constants";
import Edit from "@mui/icons-material/Edit";
import useAuth from "hooks/useAuth";

const UpdateButton = ({ onClick, requiredPermissions = "", disabled }) => {
  const { checkAccess } = useAuth();
  const isDisabled = useMemo(
    () => !checkAccess(requiredPermissions) || disabled,
    [checkAccess, requiredPermissions, disabled]
  );
  return (
    <IconButton
      size={DEFAULT_MUI_DATATABLE_BUTTON_SIZE}
      sx={{
        "&:hover": (theme) => ({
          color: theme.palette.primary.main,
        }),
      }}
      onClick={onClick}
      disabled={isDisabled}
    >
      <Edit />
    </IconButton>
  );
};

UpdateButton.defaultProps = {
  requiredPermissions: [],
};

UpdateButton.propTypes = {
  onClick: PropTypes.func,
  requiredPermissions: PropTypes.string,
  disabled: PropTypes.bool,
};

export default UpdateButton;
