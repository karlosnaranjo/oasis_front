import { createContext, useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
// utils
import ApiServiceFecth from "service/ApiServiceFecth";
import AuthService from "service/AuthService";
import axios from "../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  permissions: [],
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, permissions } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      permissions,
    };
  },
  LOGIN: (state, action) => {
    const { user, permissions } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      permissions,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAccess: () => Promise.resolve(),
  register: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (AuthService.isAuthenticated() && AuthService.isTokenValid()) {
          await ApiServiceFecth.getUser()
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              AuthService.storeSessionData(null);
              throw Error(response);
            })
            .then((response) => {
              const { user, permissions } = response;
              dispatch({
                type: "INITIALIZE",
                payload: {
                  isAuthenticated: true,
                  user,
                  permissions,
                },
              });
            })
            .catch((error) => {
              const message =
                (error.response && error.response.data.message) ||
                "Credenciales inválidos";
              throw Error(message);
            });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
              permissions: [],
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
            permissions: [],
          },
        });
      }
    };

    initialize();
  }, []);

  const checkAccess = useCallback(
    (userPermission = "") => {
      const { permissions } = state;
      if (userPermission) {
        if (permissions.includes(userPermission)) {
          return true;
        }
        return false;
      }
      return true;
    },
    [state]
  );

  const getPermissions = async () => {
    await ApiServiceFecth.getUser()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then((response) => {
        const { permissions } = response;

        dispatch({
          type: "PERMISSIONS",
          payload: {
            permissions,
          },
        });
      })
      .catch((error) => {
        const message =
          (error.response && error.response.data.message) ||
          "Credenciales inválidos";
        throw Error(message);
      });
  };

  const login = async (email, password) => {
    await ApiServiceFecth.login({ email, password })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then((response) => {
        const { token: accessToken, user, permissions } = response;

        AuthService.storeSessionData(accessToken);

        dispatch({
          type: "LOGIN",
          payload: {
            user,
            permissions,
          },
        });
      })
      .catch((error) => {
        const message =
          (error.response && error.response.data.message) ||
          "Credenciales inválidos";
        throw Error(message);
      });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post("/api/account/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    await ApiServiceFecth.logout()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then(() => {
        AuthService.storeSessionData(null);
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        const message = error.response && error.response.data.message;
        throw Error(message);
      });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        resetPassword,
        checkAccess,
        updateProfile,
        getPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
