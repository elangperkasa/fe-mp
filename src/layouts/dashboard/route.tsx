// import { Suspense } from 'react';
// import { Outlet, RouteObject } from 'react-router-dom';
// // auth
// import { AuthGuard } from 'src/auth/guard';
// // layouts
// // components
// import { LoadingScreen } from 'src/components/loading-screen';
// import DashboardLayout from './layout';
// import OutletDetails from '../outlet-performance/details/outlet-details';
// import OutletList from '../outlet-performance/list/outlet-list';
//
// // ----------------------------------------------------------------------
//
// export const dashboardRoutes: RouteObject[] = [
//   {
//     id: 'dashboard',
//     path: 'dashboard',
//     element: (
//       <AuthGuard>
//         <DashboardLayout>
//           <Suspense fallback={<LoadingScreen />}>
//             {/* <RoleBasedGuard hasContent roles={rolePTPL} isRoute> */}
//             {/* </RoleBasedGuard> */}
//             <Outlet />
//           </Suspense>
//         </DashboardLayout>
//       </AuthGuard>
//     ),
//     children: [
//       { element: <OutletList />, index: true },
//       { path: 'details/:id', element: <OutletDetails /> },
//     ],
//   },
// ];
