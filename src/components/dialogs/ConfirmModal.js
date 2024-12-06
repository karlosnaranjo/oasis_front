import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { Check } from '@mui/icons-material';
import BaseModal from './BaseModal';

const ConfirmModal = ({
  open,
  onClose,
  title,
  modalProps,
  message,
  onCancel,
  onAccept,
  acceptLabel = 'Aceptar',
  cancelLabel = 'Cancelar'
}) => {
  const [disabled, setDisabled] = useState(false);
  const onPressCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  const onPressAccept = async () => {
    setDisabled(true);
    if (onAccept) {
      await onAccept();
    }
  };
  return (
    <BaseModal open={open} onClose={onClose} title={title} {...modalProps}>
      {title && <DialogTitle align="center">{title}</DialogTitle>}
      {message && (
        <DialogContent>
          <Typography variant="body2" align="center">
            {message}
          </Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          disabled={disabled}
          startIcon={<Check />}
          onClick={onPressAccept}
        >
          {acceptLabel}
        </Button>
        <Button color="primary" onClick={onPressCancel}>
          {cancelLabel}
        </Button>
      </DialogActions>
    </BaseModal>
  );
};

ConfirmModal.propTypes = {
  // Text to be displayed in the accept button.
  acceptLabel: PropTypes.string,
  // Text to be displayed in the cancel button.
  cancelLabel: PropTypes.string,
  // Message to be displayed in the body section.
  message: PropTypes.string,
  // other props for the modal base.
  modalProps: PropTypes.oneOfType([PropTypes.object]),
  // Event to be executed on the accept button.
  onAccept: PropTypes.func,
  // Event to be executed on the cancel button.
  onCancel: PropTypes.func,
  // Event to close the modal
  onClose: PropTypes.func,
  // Indicate whether the modal is opened or closed.
  open: PropTypes.bool,
  // Main title for the modal.
  title: PropTypes.string
};

export default ConfirmModal;
