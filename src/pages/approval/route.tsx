import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { AuthGuard, RoleBasedGuard } from 'src/auth/guard';
import { LoadingScreen } from 'src/components/loading-screen';
import DashboardLayout from '../../layouts/dashboard/layout';
import { BASIC_ROLE } from '../../config-global';

const ApprovalList = lazy(() => import('./list/approval-list'));
const ApprovalDetail = lazy(() => import('./detail/approval-detail'));

export const approvalRoutes: RouteObject[] = [
  {
    id: 'approval',
    path: 'approval',
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
    children: [
      { element: <ApprovalList />, index: true },
      { path: 'detail/:id', element: <ApprovalDetail /> },
    ],
  },
];
