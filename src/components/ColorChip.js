import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";

function ColorChip({ colorCode }) {
  return (
    <Chip size="small" style={{ backgroundColor: colorCode, color: "white" }} />
  );
}

ColorChip.propTypes = {
  colorCode: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ColorChip;
