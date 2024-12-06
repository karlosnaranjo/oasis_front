import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import LogoOnlyLayout from "layouts/LogoOnlyLayout";
import DashboardLayout from "../layouts/dashboard";
// guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isApp = pathname.includes("/app");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isApp && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: "register",
      element: (
        <GuestGuard>
          <Register />
        </GuestGuard>
      ),
    },
    {
      path: "app",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/app/dashboard" replace /> },
        { path: "dashboard", element: <GeneralApp /> },
        {
          path: "general",
          children: [
            {
              path: "masters",
              children: [
                { path: "employees", element: <Employees /> },
                { path: "employees/new", element: <EmployeesNew /> },
                { path: "employees/edit/:id", element: <EmployeesEdit /> },

                { path: "patients", element: <Patients /> },
                { path: "patients/new", element: <PatientsNew /> },
                { path: "patients/edit/:id", element: <PatientsEdit /> },

                { path: "drugs", element: <Drugs /> },
                { path: "drugs/new", element: <DrugsNew /> },
                { path: "drugs/edit/:id", element: <DrugsEdit /> },

                { path: "relatives", element: <Relatives /> },
                { path: "relatives/new", element: <RelativesNew /> },
                { path: "relatives/edit/:id", element: <RelativesEdit /> },

                { path: "phases", element: <Phases /> },
                { path: "phases/new", element: <PhasesNew /> },
                { path: "phases/edit/:id", element: <PhasesEdit /> },

                { path: "targets", element: <Targets /> },
                { path: "targets/new", element: <TargetsNew /> },
                { path: "targets/edit/:id", element: <TargetsEdit /> },

                {
                  path: "user",
                  children: [{ path: "account", element: <UserAccount /> }],
                },
              ],
            },
            {
              path: "transactions",
              children: [

                
                { path: "psychologies", element: <Psychologies /> },
                { path: "psychologies/new", element: <PsychologiesNew /> },
                { path: "psychologies/edit/:id", element: <PsychologiesEdit /> },

                { path: "evolutions", element: <Evolutions /> },
                { path: "evolutions/new", element: <EvolutionsNew /> },
                { path: "evolutions/edit/:id", element: <EvolutionsEdit /> },

                { path: "evaluations", element: <Evaluations /> },
                { path: "evaluations/new", element: <EvaluationsNew /> },
                { path: "evaluations/edit/:id", element: <EvaluationsEdit /> },

                
              ],
            },
          ],
        },
        {
          path: "seguridad",
          children: [
            { path: "roles", element: <Rol /> },
            { path: "roles/new", element: <RolNew /> },
            { path: "roles/edit/:id", element: <RolEdit /> },
            { path: "usuarios", element: <Usuario /> },
            { path: "usuarios/new", element: <UsuarioNew /> },
            { path: "usuarios/edit/:id", element: <UsuarioEdit /> },
          ],
        },
      ],
    },
    // Main Routes
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "500", element: <Page500 /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import("pages/authentication/login/Login")));
const Register = Loadable(
  lazy(() => import("../pages/authentication/Register"))
);
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const UserAccount = Loadable(
  lazy(() => import("../pages/dashboard/UserAccount"))
);
// const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
// const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));

// MASTERS
const Employees = Loadable(lazy(() => import("pages/masters/employees")));
const EmployeesNew = Loadable(
  lazy(() => import("pages/masters/employees/New"))
);
const EmployeesEdit = Loadable(
  lazy(() => import("pages/masters/employees/Edit"))
);


const Patients = Loadable(lazy(() => import("pages/masters/patients")));
const PatientsNew = Loadable(
  lazy(() => import("pages/masters/patients/New"))
);
const PatientsEdit = Loadable(
  lazy(() => import("pages/masters/patients/Edit"))
);

const Drugs = Loadable(lazy(() => import("pages/masters/drugs")));
const DrugsNew = Loadable(
  lazy(() => import("pages/masters/drugs/New"))
);
const DrugsEdit = Loadable(
  lazy(() => import("pages/masters/drugs/Edit"))
);

const Relatives = Loadable(lazy(() => import("pages/masters/relatives")));
const RelativesNew = Loadable(
  lazy(() => import("pages/masters/relatives/New"))
);
const RelativesEdit = Loadable(
  lazy(() => import("pages/masters/relatives/Edit"))
);

const Phases = Loadable(lazy(() => import("pages/masters/phases")));
const PhasesNew = Loadable(
  lazy(() => import("pages/masters/phases/New"))
);
const PhasesEdit = Loadable(
  lazy(() => import("pages/masters/phases/Edit"))
);  

const Targets = Loadable(lazy(() => import("pages/masters/targets")));
const TargetsNew = Loadable(
  lazy(() => import("pages/masters/targets/New"))
);
const TargetsEdit = Loadable(
  lazy(() => import("pages/masters/targets/Edit"))
);  

// TRANSACTIONS

const Psychologies = Loadable(lazy(() => import("pages/transactions/psychologies")));
const PsychologiesNew = Loadable(
  lazy(() => import("pages/transactions/psychologies/New"))
);
const PsychologiesEdit = Loadable(
  lazy(() => import("pages/transactions/psychologies/Edit"))
);

const Evaluations = Loadable(lazy(() => import("pages/transactions/evaluations")));
const EvaluationsNew = Loadable(
  lazy(() => import("pages/transactions/evaluations/New"))
);
const EvaluationsEdit = Loadable(
  lazy(() => import("pages/transactions/evaluations/Edit"))
);

const Evolutions = Loadable(lazy(() => import("pages/transactions/evolutions")));
const EvolutionsNew = Loadable(
  lazy(() => import("pages/transactions/evolutions/New"))
);
const EvolutionsEdit = Loadable(
  lazy(() => import("pages/transactions/evolutions/Edit"))
);

// SECURITY
const Rol = Loadable(lazy(() => import("pages/seguridad/roles/List")));
const RolNew = Loadable(lazy(() => import("pages/seguridad/roles/New")));
const RolEdit = Loadable(lazy(() => import("pages/seguridad/roles/Edit")));

const Usuario = Loadable(lazy(() => import("pages/seguridad/usuario/List")));
const UsuarioNew = Loadable(lazy(() => import("pages/seguridad/usuario/New")));
const UsuarioEdit = Loadable(
  lazy(() => import("pages/seguridad/usuario/Edit"))
);

const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
