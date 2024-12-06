import { Typography } from '@mui/material';
import React from 'react';
import Link from '@mui/material/Link';
import { PropTypes } from 'prop-types';
import useAuth from 'hooks/useAuth';

const LabelLink = ({ labelName, labelUrl, targetType, permissions, disabled }) => {
  const { checkAccess } = useAuth();
  return (
    <>
      {!checkAccess(permissions) || disabled ? (
        <Typography>{labelName}</Typography>
      ) : (
        <Link
          href={labelUrl}
          underline="hover"
          target={targetType}
          readOnly={!checkAccess(permissions) || disabled}
          sx={{
            color: (theme) => theme.palette.text.primary,
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
              color: (theme) => theme.palette.primary.main
            }
          }}
        >
          {labelName}
        </Link>
      )}
    </>
  );
};

LabelLink.propTypes = {
  labelName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelUrl: PropTypes.string,
  targetType: PropTypes.string,
  permissions: PropTypes.oneOfType([PropTypes.array]),
  disabled: PropTypes.bool
};

export default LabelLink;
