import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IPermissionIRole, IUserRole } from "../interfaces/types";
import { postOrPutData } from "../utils/apiRequests";
const RoleSchema = Yup.object().shape({
  label: Yup.string().required("Label is required"),
  role: Yup.string().required("Role is required"),
  description: Yup.string(),
  permissions: Yup.array()
    .of(Yup.string())
    .required("At least one permission is required"),
});

const UserRoleForm = ({
  initialData,
  permissions,
}: {
  initialData?: IUserRole;
  permissions: IPermissionIRole[];
}) => {
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const mutation = useMutation<{ message: string }, Error, IUserRole>({
    mutationFn: (newData) =>
      postOrPutData(
        initialData ? `user-role/${initialData.id}` : "user-role",
        newData,
        initialData ? "PUT" : "POST"
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRoles"] });
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

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
      <Formik
        initialValues={{
          label: initialData?.label || "",
          role: initialData?.role || "",
          description: initialData?.description || "",
          permissions: initialData?.permissions || [],
        }}
        validationSchema={RoleSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          mutation.mutate(values, {
            onSuccess: (data) => {
              resetForm();
              setMsg(data.message);
            },
            onError: (err) => {
              setError(err.message);
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-600">Label</label>
              <Field
                type="text"
                name="label"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter label"
              />
              <ErrorMessage
                name="label"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-600">Role</label>
              <Field
                type="text"
                name="role"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter role"
              />
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-600">Description</label>
              <Field
                as="textarea"
                name="description"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter description"
                rows={3}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-600">Permissions</label>
              <div className="border border-gray-300 rounded-lg p-2 mt-1">
                {permissions &&
                  permissions.length > 0 &&
                  permissions.map((perm) => (
                    <label
                      key={perm.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        name="permissions"
                        value={perm.id}
                        checked={values.permissions.includes(perm.id)}
                        onChange={(e) => {
                          const newPermissions = e.target.checked
                            ? [...values.permissions, perm.id]
                            : values.permissions.filter((p) => p !== perm.id);
                          setFieldValue("permissions", newPermissions);
                        }}
                        className="mr-2"
                      />
                      <span>{perm.name}</span>
                    </label>
                  ))}
              </div>
              <ErrorMessage
                name="permissions"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {error && (
              <div className="text-center font-bold mt-1 bg-red-200 text-red-700 text-sm p-4 rounded-lg">
                <p>{error}</p>
              </div>
            )}

            {msg && (
              <div className="text-center font-bold mt-1 bg-green-200 text-green-700 text-sm p-4 rounded-lg">
                <p>{msg}</p>
              </div>
            )}

            <button
              type="submit"
              className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserRoleForm;
