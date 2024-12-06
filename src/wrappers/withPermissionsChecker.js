import React from 'react';
import { AuthContext } from 'contexts/AuthContext';

const checkPermissions = (userPermissions = [], neededPermissions = []) => {
  const grantedPermissions = {};
  neededPermissions.forEach((permission) => {
    grantedPermissions[permission] = userPermissions.includes(permission);
  });
  return grantedPermissions;
};

// const hasAccess = (userPermissions = [], neededPermissions = []) => {
//   for (let i = 0; i < neededPermissions.length; i++) {
//     if (!userPermissions.includes(neededPermissions[i])) {
//       return false;
//     }
//   }
//   return true;
// };

export default (WrappedComponent, neededPermissions = []) =>
  (props) =>
    (
      <>
        <AuthContext.Consumer>
          {({ permissions = [] }) => (
            <WrappedComponent
              {...props}
              permissions={checkPermissions(permissions, neededPermissions)}
              // checkAccess={(needed) => hasAccess(permissions, needed)}
            />
          )}
        </AuthContext.Consumer>
      </>
    );
