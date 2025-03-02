import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CircularLoader from "./Loaders/Circular";
import { IPermission, IUserRole } from "../interfaces/types";

const API_URL = import.meta.env.VITE_API_URL;

const RoleSchema = Yup.object().shape({
  label: Yup.string().required("Label is required"),
  role: Yup.string().required("Role is required"),
  description: Yup.string(),
  permissions: Yup.array()
    .of(Yup.string())
    .required("At least one permission is required"),
});

const UserRoleForm = ({ initialData }: { initialData?: IUserRole }) => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [msg, error]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionsRes = await axios.get(`${API_URL}/permissions`);

        setPermissions(permissionsRes.data.payload);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500">
        <CircularLoader />
      </p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

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
          try {
            await axios.post(`${API_URL}/user-role`, values);
            setMsg("Role created successfully!");
            resetForm();
          } catch (error) {
            setError("Failed to create role");
          }
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
                {permissions.length > 0 &&
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserRoleForm;
