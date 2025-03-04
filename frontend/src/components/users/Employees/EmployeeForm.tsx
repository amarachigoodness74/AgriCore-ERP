import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import ThreeDotsLoader from "../../Loaders/ThreeDots";
import { IEmployee } from "../../../interfaces/employee";
import { getData, postOrPutData } from "../../../utils/apiRequests";
import CircularLoader from "../../Loaders/Circular";
import { IUserRole } from "../../../interfaces/types";

const EmployeeForm = ({ initialData }: { initialData?: IEmployee }) => {
  const queryClient = useQueryClient();

  const {
    data: userRoles,
    error: userRolesError,
    isLoading: userRolesLoading,
  } = useQuery({
    queryKey: ["userRoles"],
    queryFn: () => getData("user-role"),
  });

  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const initialValues = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    gender: initialData?.gender || "",
    department: initialData?.department || "",
    role: initialData?.role || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Invalid gender")
      .required("Gender is required"),
    department: Yup.string().required("Department is required"),
    role: Yup.string().required("Role is required"),
  });

  const mutation = useMutation<
    { message: string; error?: string },
    Error,
    IEmployee
  >({
    mutationFn: (newData) =>
      postOrPutData(
        initialData ? `employees/${initialData.id}` : "employees",
        newData,
        initialData ? "PUT" : "POST"
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      setError(`Error submitting form: ${error.message}`);
    },
  });

  useEffect(() => {
    if (msg || error) {
      const timer = setTimeout(() => {
        setMsg(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [msg, error]);

  if (userRolesLoading)
    return (
      <p className="text-center text-gray-500">
        <CircularLoader />
      </p>
    );

  if (userRolesError)
    return <p className="text-red-500">{(userRolesError as Error).message}</p>;

  return (
    <main className="flex-1 bg-gray-100 p-6 overflow-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const selectedRole = userRoles.payload.find(
            (r) => r.label === values.role
          );
          const updatedValues = {
            ...values,
            role: selectedRole.role,
            label: selectedRole.label,
          };
          mutation.mutate(updatedValues, {
            onSuccess: (data) => {
              if (data.error) {
                setError(data.error);
              } else {
                setMsg(data.message);
                resetForm();
              }
            },
            onError: (err) => {
              setError(err.message);
              console.log("err", err);
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 shadow rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <Field name="name" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <Field name="phone" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <Field
                as="select"
                name="gender"
                className="w-full border p-2 rounded text-gray-500"
              >
                <option className="text-red-500" value="">
                  Select Gender
                </option>
                <option className="text-red-500" value="Male">
                  Male
                </option>
                <option className="text-red-500" value="Female">
                  Female
                </option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Department</label>
              <Field name="department" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="department"
                component="div"
                className="text-red-500"
              />
            </div>
            {userRoles && userRoles.payload.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <Field
                  as="select"
                  name="role"
                  className="w-full border p-2 rounded text-gray-500"
                >
                  <option className="text-red-500" value="">
                    Select Role
                  </option>
                  {userRoles.payload.map((userRole: IUserRole) => (
                    <option
                      className="text-red-500"
                      value={userRole.label}
                      key={userRole.label}
                    >
                      {userRole.role}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500"
                />
              </div>
            )}

            {error && (
              <div className="text-center font-bold mt-1 text-red-500 text-sm">
                <p>{error}</p>
              </div>
            )}
            {msg && (
              <div className="text-center font-bold mt-1 text-green-500 text-sm">
                <p>{msg}</p>
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending ? (
                <ThreeDotsLoader size="w-2 h-2" color="bg-purple-300" />
              ) : (
                "Submit"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default EmployeeForm;
