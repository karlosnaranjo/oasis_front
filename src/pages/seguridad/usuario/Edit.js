import React, { useState, useRef } from 'react';
import { withApi, withNotification } from 'wrappers';
import { PageGeneral } from 'components';
import masterMessages from 'constantes/masterMessages';
import { useParams } from 'react-router';
import TabsComponent from 'components/Tab';
import { Card, Grid } from '@mui/material';
import Form from './Form';
import TablePermission from './RolePermission';

const { title, updateTitle } = masterMessages.seguridad.rol;

const breadcrumbs = [{ label: 'Seguridad' }, { label: title }];

const MIN_HEIGHT = 250;

function Edit() {
  const { id } = useParams();

  return (
    <PageGeneral title={updateTitle} breadcrumbs={breadcrumbs} withOutCard>
      <Grid container spacing={2} sx={{ pb: 2, minHeight: MIN_HEIGHT }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, minHeight: '100%' }}>
              <Form id={id} />
          </Card>
        </Grid>
      </Grid>
    </PageGeneral>
  );
}

export default withApi(withNotification(Edit));
