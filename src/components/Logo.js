import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const SECONDARY_MAIN = theme.palette.secondary.main;

  return (
    <Box sx={{ width: 45, height: 45, ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="50.000000pt" height="54.000000pt" viewBox="0 0 61.000000 57.000000" preserveAspectRatio="xMidYMid meet">
        <metadata>
        Created by potrace 1.16, written by Peter Selinger 2001-2019
        </metadata>
        
        </svg>
    </Box>
  );
}
