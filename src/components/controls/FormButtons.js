import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Box, Button } from '@mui/material';
import { withStyles } from '@mui/styles';
import ButtonBack from './ButtonBack';
import ButtonSave from './ButtonSave';
import { ButtonEdit } from '.';

/**
 * Description:
 * Componente para usar dentro de los formularios,
 * tanto en los formularios modalizados como en los
 * formularios de las vistas aplicando la guia de
 * estilos establecida en la aplicación.
 *
 * Usage:
 * Form View:
 * <FormButtons formProps={subProps} title="titulo"/>
 *
 * Form Modal:
 * <FormButtons formProps={subProps} onClose={onCloseFunc} />
 *
 * With Children:
 * <FormButtons props>
 *  <Other component />
 * </FormButtons>
 *
 * @param {*} props
 * @returns NodeComponent
 */

const FormButtons = ({ formProps: { isSubmitting = false } = {}, disableEdit, onClose, onEdit, classes, children }) => (
  <Grid item container justifyContent="flex-end">
    <Box display="flex" flexDirection="row" m={2}>
      {onEdit ? (
        <Typography className={classes.typography}>
          <ButtonEdit disabled={isSubmitting || disableEdit} onEdit={onEdit} />
        </Typography>
      ) : (
        <Typography className={classes.typography}>
          <ButtonSave disabled={isSubmitting} />
        </Typography>
      )}
      {onClose && (
        <Typography className={classes.typography}>
          <Button disabled={isSubmitting} variant="contained" onClick={onClose}>
            Cancelar
          </Button>
        </Typography>
      )}
      <Typography className={classes.typography}>
        <ButtonBack disabled={isSubmitting} />
      </Typography>
      {children}
    </Box>
  </Grid>
);

FormButtons.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onEdit: PropTypes.func,
  disableEdit: PropTypes.bool,
  classes: PropTypes.shape().isRequired,
  formProps: PropTypes.shape({
    isSubmitting: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired
  })
};

const styles = {
  typography: {
    marginRight: 10
  }
};

export default withStyles(styles)(FormButtons);
