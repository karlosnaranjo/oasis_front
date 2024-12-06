import React from 'react';
import { PageGeneral } from 'components';
import masterMessages from 'constantes/masterMessages';
import Form from './Form';


const {
  transactions: {
    workOrders: { title, }
  }
} = masterMessages;

const breadcrumbs = [{ label: 'Transacciones' }, { label: title }];

function New() {
  return (
    <PageGeneral title={title} breadcrumbs={breadcrumbs}>
      <Form />
    </PageGeneral>
  );
}

New.propTypes = {};

export default New;
