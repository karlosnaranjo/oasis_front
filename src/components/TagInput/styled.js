import styled from 'styled-components';
import { Chip as ChipBase } from '@mui/material';

const Chip = styled(ChipBase)`
  margin: 5px;
`;

const Wrapper = styled.div``;

const ItemsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export { Chip, ItemsWrapper, Wrapper };
