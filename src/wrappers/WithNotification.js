import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { ReportableException } from 'exceptions';
import UnauthenticatedException from 'exceptions/UnauthenticatedException';
import messages from 'constantes/messages';

const withNotification = (WrappedComponent) => (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const appInfo = (message) => enqueueSnackbar(message, { variant: 'info' });
  const appSuccess = (message) => enqueueSnackbar(message, { variant: 'success' });
  const appWarning = (message) => enqueueSnackbar(message, { variant: 'warning' });
  const appError = (message, errorInfo) => {
    enqueueSnackbar(message, { variant: 'error' });
    // TODO: Replace this with error logger.
    // eslint-disable-next-line no-console
    console.log(errorInfo);
  };
  const appNotify = (message) => enqueueSnackbar(message);

  const genericException = (exception) => {
    if (exception instanceof ReportableException) {
      appWarning(exception.message);
    } else if (exception instanceof UnauthenticatedException) {
      appWarning(exception.message);
    } else {
      appError(messages.dataFetch.fail, exception);
    }
  };

  return (
    <WrappedComponent
      appInfo={appInfo}
      appWarning={appWarning}
      appSuccess={appSuccess}
      appError={appError}
      appNotify={appNotify}
      genericException={genericException}
      {...props}
    />
  );
};

export const propTypes = {
  appInfo: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  appWarning: PropTypes.func.isRequired,
  appError: PropTypes.func.isRequired,
  appNotify: PropTypes.func.isRequired
};

export default withNotification;
