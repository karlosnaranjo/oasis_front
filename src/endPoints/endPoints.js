const endPoints = {
  masters: {
    employees: {
      base: "employees",
      initForm: "employees/initform",
    },
    patients: {
      base: "patients",
      initForm: "patients/initform",
    },
    drugs: {
      base: "drugs",
      initForm: "drugs/initform",
    },
    phases: {
      base: "phases",
      initForm: "phases/initform",
    },
    targets: {
      base: "targets",
      initForm: "targets/initform",
    },
    relatives: {
      base: "relatives",
      initForm: "relatives/initform",
    },

  },
  transactions: {

    psychologies: {
      base: "psychologies",
      initForm: "psychologies/initform",
    },
    evolutions: {
      base: "evolutions",
      initForm: "evolutions/initform",
      report: "evolutions/report",
    },
    evaluations: {
      base: "evaluations",
      initForm: "evaluations/initform",
    },
    psychologyRelatives: {
      base: "psychologies_relatives",
      initForm: "psychologies_relatives/initform",
    },

    psychologyDrugs: {
      base: "psychologies_drugs",
      initForm: "psychologies_drugs/initform",
    },


  },
  seguridad: {
    usuarios: {
      base: "seguridad/usuarios",
      initFormComponent: "seguridad/usuarios/initFormComponent",
    },
    roles: {
      base: "seguridad/roles",
      permisos: "seguridad/roles/permisos",
      initFormComponent: "seguridad/roles/initFormComponent",
    },
    rolesPermission: {
      base: "seguridad/rolespermissions",
      getPermission: "seguridad/rolespermissions/getPermissions",
      permisos: "seguridad/roles/permisos",
      initFormComponent: "seguridad/roles/initFormComponent",
    },
    permisos: {
      byRole: "seguridad/permisos/byRole",
      byUser: "seguridad/permisos/byUser",
    },
  },
  auth: {
    login: "login",
    logout: "logout",
    getUser: "user",
  },
};

export default endPoints;
