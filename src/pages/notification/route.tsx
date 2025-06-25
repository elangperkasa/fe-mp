import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { AuthGuard, RoleBasedGuard } from 'src/auth/guard';
import { LoadingScreen } from 'src/components/loading-screen';
import DashboardLayout from '../../layouts/dashboard/layout';
import { BASIC_ROLE } from '../../config-global';

const Notification = lazy(() => import('./notification'));

export const notificationRoutes: RouteObject[] = [
  {
    id: 'notification',
    path: 'notification',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <RoleBasedGuard hasContent roles={BASIC_ROLE} isRoute>
              <Outlet />
            </RoleBasedGuard>
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [{ element: <Notification />, index: true }],
  },
];
