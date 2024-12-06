import React, { useState, useRef, useEffect } from 'react';
import { withApi, withNotification } from 'wrappers';
import { PageGeneral } from 'components';
import masterMessages from 'constantes/masterMessages';
import { useParams } from 'react-router';
import TabsComponent from 'components/Tab';
import { Card, Grid } from '@mui/material';
import PsychologiesForm from './Form';
import PsychologyRelativesGrid from './psychology_relatives/index';
import PsychologyDrugsGrid from './psychology_drugs/index';

const { title, updateTitle } = masterMessages.transactions.psychologies;

const breadcrumbs = [{ label: 'Maestros' }, { label: title }];

const MIN_HEIGHT = 250;

function Edit() {
  const { id } = useParams();
  const [editable, setEditable] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  const child = useRef();

  const refreshParent = () => child.current.refresh();
  
    const tabConfig = [
			{'label': 'Historia Familiar', component: <PsychologyRelativesGrid id={id} refreshParent={refreshParent} editable={!editable}/>},
			{'label': 'Cuadro de consumo', component: <PsychologyDrugsGrid id={id} refreshParent={refreshParent} editable={!editable}/>},
    ]
    

  return (
    <PageGeneral title={updateTitle} breadcrumbs={breadcrumbs} withOutCard>
      <Grid container spacing={2} sx={{ pb: 2, minHeight: MIN_HEIGHT }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, minHeight: '100%' }}>
              <PsychologiesForm id={id} refresh={child} setEditable={setEditable} setViewMode={setViewMode} viewMode={viewMode} 
              />
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ pl: 2, pr: 2 }}>
        <TabsComponent config={tabConfig} />
      </Card>
    </PageGeneral>
  );
}

export default withApi(withNotification(Edit));