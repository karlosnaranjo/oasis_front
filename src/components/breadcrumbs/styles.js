import { Breadcrumbs, Divider } from '@mui/material';
import { spacing } from '@mui/system';
import styled from 'styled-components';

const StyledBreadcrumbs = styled(Breadcrumbs)(spacing);
const StyledDivider = styled(Divider)(spacing);
const Wrapper = styled.div`
  width: 100%;
  padding: 15px 0;
`;

export { StyledBreadcrumbs, StyledDivider, Wrapper };
