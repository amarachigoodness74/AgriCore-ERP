import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "../layouts/Auth";
import ThreeDotsLoader from "../components/Loaders/ThreeDots";
import { useAuthContext } from "../context/auth/AuthContext";
import { postOrPutData } from "../utils/apiRequests";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated, setCurrentUser } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = location.state?.from?.pathname || "/dashboard";

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }
    try {
      const userJson = await postOrPutData(
        "auth/login",
        { email, password },
        "POST"
      );
      if (userJson.status === "error" || userJson.errors) {
        setError(
          Array.isArray(userJson.errors || userJson.error)
            ? userJson.errors[0].msg || userJson.error[0].msg
            : userJson.errors || userJson.error
        );
        return;
      } else {
        setIsAuthenticated(true);
        setCurrentUser(userJson.payload);
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <AuthLayout title="Sign In">
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
              <ErrorMessage
                name="email"
                component="p"
                className="mt-1 text-red-500 text-sm"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="flex items-center mt-1">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`block w-full px-3 py-2 border ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-gray-500 focus:outline-none"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="mt-1 text-red-500 text-sm"
              />
            </div>
            {error && (
              <div className="text-center font-bold mt-1 text-red-500 text-sm">
                <p>{error}</p>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ThreeDotsLoader size="w-2 h-2" color="bg-purple-300" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Signin;
