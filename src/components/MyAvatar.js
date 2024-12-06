// hooks
import createAvatar from 'utils/createAvatar';
import { MAvatar } from 'components/@material-extend';
import useAuth from 'hooks/useAuth';
//

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user.photoURL}
      alt={user.name}
      color={user.photoURL ? 'default' : createAvatar(user.name).color}
      {...other}
    >
      {createAvatar(user.name).name}
    </MAvatar>
  );
}
