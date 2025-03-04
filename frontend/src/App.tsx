import React, { Suspense, lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingIndicator from "./components/Loaders/Circular";
import reloadOnFail from "./utils/reloadOnFail";
import DashboardLayout from "./layouts/Dashboard";
// import RequireAuth from "./context/auth/RequireAuth";

const SignInPage = lazy(() => reloadOnFail(() => import("./pages/Signin")));
const ForgotPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ForgotPassword"))
);
const ResetPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ResetPassword"))
);

const Dashboard = lazy(() => reloadOnFail(() => import("./pages/Dashboard")));
const UserRole = lazy(() => reloadOnFail(() => import("./pages/UserRole")));
const Profile = lazy(() => reloadOnFail(() => import("./pages/Profile")));

// Users Management Routes
const Users = lazy(() =>
  reloadOnFail(() => import("./pages/Users"))
);
const Employees = lazy(() =>
  reloadOnFail(() => import("./components/users/Employees"))
);
const Clients = lazy(() =>
  reloadOnFail(() => import("./components/users/Employees"))
);
const Suppliers = lazy(() =>
  reloadOnFail(() => import("./components/users/Employees"))
);

// Inventory Management Routes
const ProductList = lazy(() =>
  reloadOnFail(() => import("./components/Inventory/Products/ProductList"))
);
const SupplierList = lazy(() =>
  reloadOnFail(() => import("./components/Inventory/Suppliers/SupplierList"))
);
const PurchaseOrderList = lazy(() =>
  reloadOnFail(
    () => import("./components/Inventory/PurchaseOrders/PurchaseOrderList")
  )
);

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingIndicator />}>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
          <Routes>
            <Route
              // path="/"
              // element={
              //   <RequireAuth>
              //     <DashboardLayout />
              //   </RequireAuth>
              // }
              element={<DashboardLayout />}
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="user-role" element={<UserRole />} />
              <Route path="profile" element={<Profile />} />

              {/* Users Management Routes */}
              <Route path="/users" element={<Users />} />
              <Route path="/users/employees" element={<Employees />} />
              <Route path="users/clients" element={<Clients />} />
              <Route path="users/suppliers" element={<Suppliers />} />

              {/* Inventory Management Routes */}
              <Route path="inventory/" element={<Dashboard />} />
              <Route path="inventory/products" element={<ProductList />} />
              <Route path="inventory/suppliers" element={<SupplierList />} />
              <Route
                path="inventory/purchase-orders"
                element={<PurchaseOrderList />}
              />
              {/* <Route path="settings" element={<Settings />} /> */}
            </Route>
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
