// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_APP = "/app";
export const ROOTS_GENERAL = "/app/general/";
export const ROOTS_ADMINISTRACION = "/app/administracion/";
export const ROOTS_SEGURIDAD = "/app/seguridad/";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  verify: path(ROOTS_AUTH, "/verify"),
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  page404: "/404",
  page500: "/500",
};

export const PATH_APP = {
  root: ROOTS_APP,
  general: {
    app: path(ROOTS_APP, "/dashboard"),
    ecommerce: path(ROOTS_APP, "/ecommerce"),
    analytics: path(ROOTS_APP, "/analytics"),
    banking: path(ROOTS_APP, "/banking"),
    booking: path(ROOTS_APP, "/booking"),
  },
  masters: {
    employees: path(ROOTS_GENERAL, "masters/employees"),
    patients: path(ROOTS_GENERAL, "masters/patients"),
    drugs: path(ROOTS_GENERAL, "masters/drugs"),
    relatives: path(ROOTS_GENERAL, "masters/relatives"),
    phases: path(ROOTS_GENERAL, "masters/phases"),
    targets: path(ROOTS_GENERAL, "masters/targets"),  
  },
  transactions: {
    workOrders: path(ROOTS_GENERAL, "transactions/work_orders"),
    psychologies: path(ROOTS_GENERAL, "transactions/psychologies"),
    evaluations: path(ROOTS_GENERAL, "transactions/evaluations"),
    evolutions: path(ROOTS_GENERAL, "transactions/evolutions"),
  },
  management: {
    //controlAcceso: path(ROOTS_ADMINISTRACION, 'procesos/controlAcceso')
  },
  user: {
    profile: path(ROOTS_APP, "/user/profile"),
    account: path(ROOTS_APP, "/user/account"),
  },
  seguridad: {
    rol: path(ROOTS_SEGURIDAD, "roles"),
    usuarios: path(ROOTS_SEGURIDAD, "usuarios"),
  },
};
