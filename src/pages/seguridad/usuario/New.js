import React from 'react';
import { PageGeneral } from 'components';
import masterMessages from 'constantes/masterMessages';
import PresolpedForm from './Form';

const { title, createTitle } = masterMessages.seguridad.rol;

const breadcrumbs = [{ label: 'Seguridad' }, { label: title }];

function New() {
  return (
    <PageGeneral title={createTitle} breadcrumbs={breadcrumbs}>
      <PresolpedForm />
    </PageGeneral>
  );
}

New.propTypes = {};

export default New;
