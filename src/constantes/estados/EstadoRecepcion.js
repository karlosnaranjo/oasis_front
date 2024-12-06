import { mapEstadoLabelValue } from '../constants';

const APROBADO = 'APROBADO';
const CERRADO = 'CERRADO';
const ANULADO = 'ANULADO';
const EN_PROCESO = 'EN_PROCESO';
const BLOQUEADO = 'BLOQUEADO';
const PROCESANDO = 'PROCESANDO';

const ESTADOS = [APROBADO, CERRADO, EN_PROCESO, BLOQUEADO, ANULADO];

export default {
  APROBADO,
  CERRADO,
  ANULADO,
  ESTADOS,
  EN_PROCESO,
  labelValue: (excluidos = []) => {
    const estados = ESTADOS.filter((estado) => !excluidos.includes(estado));
    return estados.map(mapEstadoLabelValue);
  },
  enableActions: (estado) => estado !== ANULADO && estado !== CERRADO && estado !== PROCESANDO,
  canEdit: (estado) => estado !== ANULADO && estado !== CERRADO && estado !== BLOQUEADO && estado !== APROBADO
};
