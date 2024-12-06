import React, { useState, useRef } from 'react';
import { PageGeneral } from 'components';
import masterMessages from 'constantes/masterMessages';
import EvaluationsForm from './Form';

const { title, createTitle } = masterMessages.transactions.evaluations;

const breadcrumbs = [{ label: 'Maestros' }, { label: title }];

function New() {
  const [editable, setEditable] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const child = useRef();

  return (
    <PageGeneral title={createTitle} breadcrumbs={breadcrumbs}>
      <EvaluationsForm
        refresh={child}
        setEditable={setEditable}
        setViewMode={setViewMode}
        viewMode={viewMode} 
      />
    </PageGeneral>
  );
}

New.propTypes = {};

export default New;