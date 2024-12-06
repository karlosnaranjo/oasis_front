import React from 'react';
import { Dialog } from '@mui/material';
import PropTypes from 'prop-types';

const BaseModal = ({ open, onClose, children, modalProps }) => (
  <Dialog {...modalProps} fullWidth open={open} onClose={onClose} keepMounted={false}>
    {children}
  </Dialog>
);

BaseModal.propTypes = {
  children: PropTypes.node.isRequired,
  modalProps: PropTypes.oneOfType([PropTypes.object]),
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default BaseModal;
