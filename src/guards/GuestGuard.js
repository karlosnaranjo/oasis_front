import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import { PATH_APP } from 'routes/paths';
import useAuth from 'hooks/useAuth';
// routes

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={PATH_APP.root} />;
  }

  return <>{children}</>;
}
