import { useCallback, useEffect, useMemo, useReducer } from 'react';
// utils
import axios from 'src/utils/axios';
//
import { useQueryClient } from '@tanstack/react-query';
import { ACCESS_TOKEN_KEY, LOGIN_METHOD_KEY } from 'src/config-global';
import { endpoints } from 'src/utils/endpoints';
import { AuthService } from '../../../services/auth/auth-service';
import { LoginService } from '../../../services/login/login-service';
import { ActionMapType, AuthStateType, AuthUserType } from '../../types';
import { AuthContext } from './auth-context';
import { isValidToken, setAuth } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const client = useQueryClient();

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setAuth(accessToken);

        // const authService = new AuthService();
        // const user = await authService.getAccount();

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              user: null,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const credential = {
      email,
      password,
    };

    const loginService = new LoginService();
    const authService = new AuthService();

    const { accessToken, refreshToken } = await loginService.login(credential);

    setAuth(accessToken);

    sessionStorage.setItem(LOGIN_METHOD_KEY, 'App');

    const user = {} ;//await authService.getAccount();

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken,
          refreshToken,
        },
      },
    });
  }, []);

  const loginIdaman = useCallback(async (accessToken: string) => {
    const authService = new AuthService();

    setAuth(accessToken);

    sessionStorage.setItem(LOGIN_METHOD_KEY, 'Idaman');

    const user = {};//await authService.getAccount();

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken,
          refreshToken: '',
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (
      fullName: string,
      phoneNumber: string,
      email: string,
      password: string,
      emailManager: string
    ) => {
      const data = {
        fullName,
        phoneNumber,
        email,
        password,
        emailManager,
      };

      const res = await axios.post(endpoints.auth.register, data);

      const { accessToken, user } = res.data;

      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    client.clear(); // Reset react query cache

    setAuth(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      loginIdaman,
      register,
      logout,
    }),
    [login, loginIdaman, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
