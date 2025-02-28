import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
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

// Employee Management Routes
const Employees = lazy(() =>
  reloadOnFail(() => import("./components/Employees"))
);
const AddEmployee = lazy(() =>
  reloadOnFail(() => import("./components/Employees/AddEmployee"))
);
const UpdateEmployee = lazy(() =>
  reloadOnFail(() => import("./components/Employees/UpdateEmployee"))
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
  return (
    <React.StrictMode>
      <Suspense fallback={<LoadingIndicator />}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Suspense>
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

          {/* Employee Management Routes */}
          <Route path="employees" element={<Employees />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/update" element={<UpdateEmployee />} />
          {/* <Route path="employees/attendance" element={<AddEmployee />} />
          <Route path="employees/performance" element={<AddEmployee />} />
          <Route path="employees/payroll" element={<AddEmployee />} /> */}
          
          {/* Inventory Management Routes */}
          <Route path="inventory/" element={<Dashboard />} />
          <Route path="inventory/products" element={<ProductList />} />
          {/* <Route path="/inventory/products/add" element={<ProductForm />} /> */}
          <Route path="inventory/suppliers" element={<SupplierList />} />
          {/* <Route path="/inventory/suppliers/add" element={<SupplierForm />} /> */}
          <Route
            path="inventory/purchase-orders"
            element={<PurchaseOrderList />}
          />
          {/* <Route
            path="/inventory/purchase-orders/add"
            element={<PurchaseOrderForm />}
          /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </React.StrictMode>
  );
};

export default App;
