import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BreadLink from './BreadLink';
import { StyledBreadcrumbs, StyledDivider, Wrapper } from './styles';

/**
 * @name Breadcrumb
 * @desc Componente que procesa las rutas de navegación para mostrar el header
 * @param {*} param0
 */
const Breadcrumb = ({ breadcrumbs = [] }) => (
  <Wrapper>
    {breadcrumbs.length > 0 && (
      <StyledBreadcrumbs>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs.map((item) => (
            <BreadLink key={`breadcrumb-${item.label}`} label={item.label} path={item.path} />
          ))}
        </Breadcrumbs>
      </StyledBreadcrumbs>
    )}
    <StyledDivider />
  </Wrapper>
);

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string
    })
  ).isRequired
};

export default Breadcrumb;
