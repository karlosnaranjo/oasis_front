import withApi, { propTypes as withApiPropTypes } from './withApi';
import withNotification, { propTypes as withNotificationPropTypes } from './WithNotification';
import withPermissionsChecker from './withPermissionsChecker';

export {
  withApi,
  withNotification,
  withPermissionsChecker,
  // export de las proptypes de cada wrapper
  withNotificationPropTypes,
  withApiPropTypes
};
