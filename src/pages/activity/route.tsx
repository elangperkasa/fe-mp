import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { AuthGuard, RoleBasedGuard } from 'src/auth/guard';
import { LoadingScreen } from 'src/components/loading-screen';
import DashboardLayout from '../../layouts/dashboard/layout';
import { LOG_ACTIVITY_ROLE } from '../../config-global';

const Activity = lazy(() => import('./activity'));

export const activityRoutes: RouteObject[] = [
  {
    id: 'activity',
    path: 'activity',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <RoleBasedGuard hasContent roles={LOG_ACTIVITY_ROLE} isRoute>
              <Outlet />
            </RoleBasedGuard>
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [{ element: <Activity />, index: true }],
  },
];
