import React, { useState, useRef, useEffect } from 'react';
import { withApi, withNotification } from 'wrappers';
import { PageGeneral } from 'components';
import masterMessages from 'constantes/masterMessages';
import { useParams } from 'react-router';
import TabsComponent from 'components/Tab';
import { Card, Grid } from '@mui/material';
import PatientsForm from './Form';

const { title, updateTitle } = masterMessages.masters.patients;

const breadcrumbs = [{ label: 'Maestros' }, { label: title }];

const MIN_HEIGHT = 250;

function Edit() {
  const { id } = useParams();
  const [editable, setEditable] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  const child = useRef();

  const refreshParent = () => child.current.refresh();
  

  return (
    <PageGeneral title={updateTitle} breadcrumbs={breadcrumbs} withOutCard>
      <Grid container spacing={2} sx={{ pb: 2, minHeight: MIN_HEIGHT }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, minHeight: '100%' }}>
              <PatientsForm id={id} refresh={child} setEditable={setEditable} setViewMode={setViewMode} viewMode={viewMode} 
              />
          </Card>
        </Grid>
      </Grid>
      
    </PageGeneral>
  );
}

export default withApi(withNotification(Edit));