/* eslint-disable react-refresh/only-export-components */

import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

import { lazy } from "react";
import PageSuspense from "./PageSuspense";
import ErrorBoundary from "../ErrorBoundary";
import AppLayout from "../layouts/Applayout/AppLayout";

const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const OrdersPage = lazy(() => import("@/pages/orders/OrdersPage"));
const OrderCreatePage = lazy(() => import("@/pages/order-create/OrderCreatePage"));
const OrderDetailsPage = lazy(() => import("@/pages/order-details/OrderDetailsPage"));
const CustomersPage = lazy(() => import("@/pages/customers/CustomersPage"));
const CustomerDetailsPage = lazy(() => import("@/pages/customer-details/CustomerDetailsPage"));
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <Navigate to={ROUTES.dashboard} replace /> },
      {
        path: ROUTES.dashboard,
        element: (
          <PageSuspense>
            <DashboardPage />
          </PageSuspense>
        ),
      },
      {
        path: ROUTES.orders,
        element: (
          <PageSuspense>
            <OrdersPage />
          </PageSuspense>
        ),
      },
      {
        path: ROUTES.orderCreate,
        element: (
          <PageSuspense>
            <OrderCreatePage />
          </PageSuspense>
        ),
      },
      {
        path: ROUTES.orderDetails,
        element: (
          <PageSuspense>
            <OrderDetailsPage />
          </PageSuspense>
        ),
      },
      {
        path: ROUTES.customers,
        element: (
          <PageSuspense>
            <CustomersPage />
          </PageSuspense>
        ),
      },
      {
        path: ROUTES.customerDetails,
        element: (
          <PageSuspense>
            <CustomerDetailsPage />
          </PageSuspense>
        ),
      },
      {
        path: "*",
        element: (
          <PageSuspense>
            <NotFoundPage />
          </PageSuspense>
        ),
      },
    ],
  },
]);

// export const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       { path: "/", element: <Navigate to={ROUTES.dashboard} replace /> },
//       {
//         path: ROUTES.dashboard,
//         element: (
//           <PageSuspense>
//             (<DashboardPage />)
//           </PageSuspense>
//         ),
//       },
//       {
//         path: ROUTES.orders,
//         element: (
//           <PageSuspense>
//             (<OrdersPage />)
//           </PageSuspense>
//         ),
//       },
//       {
//         path: ROUTES.orderCreate,
//         element: (
//           <PageSuspense>
//             (<OrderCreatePage />)
//           </PageSuspense>
//         ),
//       },
//       {
//         path: ROUTES.orderDetails,
//         element: (
//           <PageSuspense>
//             (<OrderDetailsPage />){" "}
//           </PageSuspense>
//         ),
//       },
//       {
//         path: ROUTES.customers,
//         element: (
//           <PageSuspense>
//             (<CustomersPage />)
//           </PageSuspense>
//         ),
//       },
//       {
//         path: ROUTES.customerDetails,
//         element: (
//           <PageSuspense>
//             (<CustomerDetailsPage />)
//           </PageSuspense>
//         ),
//       },
//       {
//         path: "*",
//         element: (
//           <PageSuspense>
//             (<NotFoundPage />){" "}
//           </PageSuspense>
//         ),
//       },
//     ],
//   },
// ]);
