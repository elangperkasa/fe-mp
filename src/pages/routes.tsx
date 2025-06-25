import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import MainLayout from 'src/layouts/main/layout';
import { RootBoundary } from './error';
import { approvalRoutes } from './approval/route';
import { paths } from './paths';
import View404 from './error/404';
import { authRoutes } from './auth/route';
import { territoryRoutes } from './territory/route';
import { regionRoutes } from './region/route';
import { userRoutes } from './user/route';
import { roleRoutes } from './role/route';
import { activityRoutes } from './activity/route';
import { notificationRoutes } from './notification/route';
import { positionRoutes } from './position/route';
import View403 from './error/403';
import IdamanLoginView from './auth/login/idaman';
import { IdamanLogout } from './auth/logout/idaman-logout';
import { IdamanIdle } from './auth/login/IdamanIdle';
import { accountRoutes } from './account/route';
import ProductPage   from './product/product';
import ProductAddPage from './product/product-add';
import ProductEditPage from './product/product-edit';
import Category from './category/category-list';
import CategoryAdd from './category/category-add';
import CategoryEdit from './category/category-edit';
import UserList from './user/userlist';
import UserAdd from './user/UserAdd';
import UserEdit from './user/UserEdit';
import Customer from './customer/customer-list';
import CustomerAdd from './customer/customer-add';
import CustomerEdit from './customer/customer-edit';
import Sales from './sales/sales-list';
import SalesAdd from './sales/sales-add';
import SalesEdit from './sales/sales-edit';
import Detail from './sales-detail/detail-list';
import DetailAdd from './sales-detail/detail-add';
import DetailEdit from './sales-detail/detail-edit';
import Promo from './promo/promo-view';
import PromoAdd from './promo/promo-add';
import PromoEdit from './promo/promo-edit';
import UserViewPage   from './userviewpage/userviewpage';
import BuyerPage   from './buyerpage/buyer-view';

export const router = createBrowserRouter(
  [
    {
      id: 'root',
      Component: App,
      errorElement: <RootBoundary />,
      children: [
        {
          element: (
            <MainLayout>
              <Outlet />
            </MainLayout>
          ),
          children: [
            // { index: true, element: <Navigate to={paths.approval.root} /> },
            { index: true, element: <Navigate to={paths.product.root} /> },
            { path: '404', element: <View404 /> },
            { path: '403', element: <View403 /> },
            { path: 'signin-oidc', element: <IdamanLoginView /> },
            { path: 'signin-oidc-idle', element: <IdamanIdle /> },
            { path: 'signout-oidc', element: <IdamanLogout /> },
            { path: 'product', element: <ProductPage /> }, 
            { path: 'addproduct', element: <ProductAddPage /> }, 
            { path: 'product/edit/:id', element: <ProductEditPage /> },
            { path: 'category', element: <Category /> }, 
            { path: 'category/add', element: <CategoryAdd /> },
            { path: 'category/edit/:id', element: <CategoryEdit /> },
            { path: 'userlist', element: <UserList /> }, 
            { path: 'userx/add', element: <UserAdd /> },
            { path: 'userx/edit/:id', element: <UserEdit /> },
            { path: 'customer', element: <Customer /> }, 
            { path: 'customer/add', element: <CustomerAdd /> },
            { path: 'customer/edit/:id', element: <CustomerEdit /> },
            { path: 'sales', element: <Sales /> }, 
            { path: 'sales/add/:id', element: <SalesAdd /> },
            { path: 'sales/edit/:id', element: <SalesEdit /> },   
            { path: 'detail/view/:id', element: <Detail /> }, 
            { path: 'detail/add/:id', element: <DetailAdd /> },
            { path: 'detail/edit/:id', element: <DetailEdit /> },   
            { path: 'promo', element: <Promo /> }, 
            { path: 'promo/add', element: <PromoAdd /> },
            { path: 'promo/edit/:id', element: <PromoEdit /> },   
            { path: 'userviewpage', element: <UserViewPage /> },   
            { path: 'buyerview', element: <BuyerPage /> },    
          ],
        },

        // Auth routes
        ...authRoutes,

        // Account routes
        ...accountRoutes,

        // Notification routes
        ...notificationRoutes,

        // ApprovalList routes
        ...approvalRoutes,

        // Master routes
        ...territoryRoutes,
        ...regionRoutes,

        // Authentication routes
        ...userRoutes,
        // ...roleRoutes,
        ...positionRoutes,

        // Log routes
        ...activityRoutes,

        // No match 404
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

function IdamanTest() {
  return <p>Hola</p>;
}
