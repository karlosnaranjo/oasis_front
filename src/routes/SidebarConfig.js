// routes
// components
import SvgIconStyle from "components/SvgIconStyle";
import {
  PATH_APP,
  ROOTS_ADMINISTRACION,
  ROOTS_GENERAL,
  ROOTS_SEGURIDAD,
} from "./paths";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: "100%", height: "100%" }}
  />
);

const ICONS = {
  settings: getIcon("settings"),
  inventory: getIcon("inventory"),
  user: getIcon("user"),
  dashboard: getIcon("ic_analytics"),
  invoice: getIcon("invoice"),
  home: getIcon("home"),
  arrowdown: getIcon("arrow_down"),
  procces: getIcon("process"),
  query: getIcon("query"),
  purchase: getIcon("purchase"),
};

const sidebarConfig = [

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "General",
    items: [
      {
        title: "Generales",
        path: ROOTS_GENERAL,
        icon: ICONS.home,
        children: [
          {
            title: "Maestros",
            path: `${ROOTS_GENERAL}masters`,
            icon: ICONS.settings,
            children: [
              { title: "Empleados", 
                path: PATH_APP.masters.employees, 
                //permissions: "general:masters:employees:list" 
              },
              { title: "Drogas", 
                path: PATH_APP.masters.drugs, 
                //permissions: "general:masters:drugs:list" 
              },
              { title: "Pacientes", 
                path: PATH_APP.masters.patients, 
                //permissions: "general:masters:patients:list" 
              },
              { title: "Familiares", 
                path: PATH_APP.masters.relatives, 
                //permissions: "general:masters:relatives:list" 
              },
              { title: "Fases", 
                path: PATH_APP.masters.phases, 
                //permissions: "general:masters:phases:list" 
              },
              { title: "Objetivos", 
                path: PATH_APP.masters.targets, 
                //permissions: "general:masters:targets:list" 
              },
            ],
          },
          {
            title: "Transacciones",
            path: `${ROOTS_GENERAL}transactions`,
            icon: ICONS.settings,
            children: [
              { title: "Psicología", 
                path: PATH_APP.transactions.psychologies, 
                //permissions: "general:transactions:psychologies:list" 
              },
              { title: "Evaluaciones", 
                path: PATH_APP.transactions.evaluations, 
                //permissions: "general:transactions:evaluations:list" 
              },
              { title: "Evoluciones", 
                path: PATH_APP.transactions.evolutions, 
                //permissions: "general:transactions:evolutions:list" 
              },
            ],
          },

        ],
      },
    ],
  },
   // SECURITY
  // ----------------------------------------------------------------------
  {
    subheader: "Seguridad",
    items: [
      {
        title: "Seguridad",
        path: ROOTS_SEGURIDAD,
        icon: ICONS.invoice,
        children: [
          { title: "Roles", path: PATH_APP.seguridad.rol },
          { title: "Usuarios", path: PATH_APP.seguridad.usuarios },
        ],
      },
    ],
  },
  
];

export default sidebarConfig;
