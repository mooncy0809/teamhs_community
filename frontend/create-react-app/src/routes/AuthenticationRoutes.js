import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option  routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const AuthSignUp = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'api/auth/signIn',
      element: <AuthLogin />
    },
    {
      path: 'api/auth/signUp',
      element: <AuthSignUp />
    }
  ]
};

export default AuthenticationRoutes;
