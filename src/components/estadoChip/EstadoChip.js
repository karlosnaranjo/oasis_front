import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

function EstadoChip({ estado, classes, onClick }) {
  const className = estado
    ? estado.replace(/_/g, "-").toLowerCase()
    : "sin-estado";
  const label = estado ? estado.replace(/_/g, " ") : "SIN ESTADO";

  const handleClick = () => {
    if (onClick) {
      onClick(); // Llama al método onClick si está definido
    }
  };

  return (
    <Chip
      size="small"
      label={label}
      className={classes[className]}
      onClick={handleClick}
    />
  );
}

EstadoChip.propTypes = {
  estado: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};

export default withStyles(styles)(EstadoChip);
