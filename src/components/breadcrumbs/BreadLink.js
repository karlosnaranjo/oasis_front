import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

/**
 * @name BreadLink
 * @desc Componente que procesa los links a mostrar de los Breadcums
 * @param {*} param0
 */
const BreadLink = ({ label }) => <Typography>{label}</Typography>;

BreadLink.propTypes = {
  label: PropTypes.string.isRequired
};

export default BreadLink;
