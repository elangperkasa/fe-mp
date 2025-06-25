import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
// auth
import { GuestGuard } from 'src/auth/guard';
// layouts

// components
import { SplashScreen } from 'src/components/loading-screen';

import ForgotPasswordPage from './forgot-password';
import AuthClassicLayout from './layout';
import LoginPage from './login';
import RegisterPage from './register';

// ----------------------------------------------------------------------

export const authRoutes: RouteObject[] = [
  {
    id: 'auth',
    path: 'auth',
    element: (
      <GuestGuard>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </GuestGuard>
    ),

    children: [
      {
        path: 'login',
        element: (
          <AuthClassicLayout title="Power Approval">
            <LoginPage />
          </AuthClassicLayout>
        ),
      },
      {
        path: 'register',
        element: (
          <AuthClassicLayout title="Register">
            <RegisterPage />
          </AuthClassicLayout>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <AuthClassicLayout>
            <ForgotPasswordPage />
          </AuthClassicLayout>
        ),
      },
    ],
  },
];
