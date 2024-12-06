import React from 'react';
import { Chip as MuiChip } from '@mui/material';
import styled from 'styled-components';
import { red, green, grey, blue } from '@mui/material/colors';
import PropTypes from 'prop-types';

export const ChipColors = {
  BLUE: 'BLUE',
  RED: 'RED',
  GREEN: 'GREEN',
  GREY: 'GREY'
};

const ChipComponent = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
`;

function Chip({ color, label, ...rest }) {
  const { GREY, GREEN, RED, BLUE } = ChipColors;
  let rgb = color;
  switch (color) {
    case GREY:
      rgb = grey['500'];
      break;
    case GREEN:
      rgb = green['500'];
      break;
    case RED:
      rgb = red['500'];
      break;
    case BLUE:
      rgb = blue['500'];
      break;
    default:
      break;
  }
  return <ChipComponent label={label} rgbcolor={rgb} {...rest} />;
}

Chip.propTypes = {
  // Colores posibles a usar son, green, red, grey, blue
  // En caso de necesitar otro, pasar el color en formato RGB Hexadecimal
  color: PropTypes.string.isRequired,
  // Texto a mostrar dentro del chip
  label: PropTypes.string
};

export default Chip;
