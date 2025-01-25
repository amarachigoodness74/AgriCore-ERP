import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingIndicator from "./components/Loaders/Circular";
import reloadOnFail from "./utils/reloadOnFail";
import RequireAuth from "./context/auth/RequireAuth";

const SignInPage = lazy(() => reloadOnFail(() => import("./pages/Signin")));
const ForgotPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ForgotPassword"))
);
const ResetPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ResetPassword"))
);

const Dashboard = lazy(() => reloadOnFail(() => import("./pages/Dashboard")));

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
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </React.StrictMode>
  );
};

export default App;
