import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthLayout from "../layouts/Auth";
import ThreeDotsLoader from "../components/Loaders/ThreeDots";
import { postOrPutData } from "../utils/apiRequests";
import { Link } from "react-router-dom";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  const [alert, setAlert] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values: { email: string }) => {
    const { email } = values;

    if (email === "") {
      setError("Please fill in all fields");
      return;
    }
    try {
      const userJson = await postOrPutData(
        "auth/forgot-password",
        { email },
        "POST"
      );
      if (userJson.status === "error") {
        setError(
          Array.isArray(userJson.errors || userJson.error)
            ? userJson.errors[0].msg || userJson.error[0].msg
            : userJson.errors || userJson.error
        );
      } else {
        setAlert(userJson.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            {alert && (
              <div className="text-center font-bold mt-1 text-green-500 text-sm">
                <p>{alert}</p>
              </div>
            )}
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
                  "Forgot Password"
                )}
              </button>
              <div className="text-right text-sm mt-4">
                <Link
                  to="/"
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Login here
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgotPassword;
