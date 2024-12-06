import React, { useRef } from 'react';
import { useParams } from 'react-router';
import { Card, Grid } from '@mui/material';
import { withApi, withNotification } from 'wrappers';
import { PageGeneral } from 'components';
import masterMessages from 'constantes/masterMessages';
import TabsComponent from 'components/Tab';
import Form from './Form';
import WorkOrderDetailsGrid from './work_order_details';

const {
  transactions: {
    workOrders: { title, updateTitle }
  }
} = masterMessages;
const breadcrumbs = [{ label: 'Transacciones' }, { label: title }];

const MIN_HEIGHT = 250;

function Edit() {
  const { id } = useParams();
  const child = useRef();
  const tabConfig = [

    {
      label: 'Detalle',
      component: <WorkOrderDetailsGrid id={id} />
    }
  ];

  return (
    <PageGeneral title={updateTitle} breadcrumbs={breadcrumbs} withOutCard>
      <Grid container spacing={2} sx={{ pb: 2, minHeight: MIN_HEIGHT }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, minHeight: '100%' }}>
            <Form id={id} refresh={child} />
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
