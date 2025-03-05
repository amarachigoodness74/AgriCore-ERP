import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import ThreeDotsLoader from "../../Loaders/ThreeDots";
import { IClient } from "../../../interfaces/users";
import { postOrPutData } from "../../../utils/apiRequests";

const ClientForm = ({ initialData }: { initialData?: IClient }) => {
  console.log("initialData", initialData);
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const initialValues = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const mutation = useMutation<
    { message: string; error?: string },
    Error,
    IClient
  >({
    mutationFn: (newData) =>
      postOrPutData(
        initialData ? `clients/${initialData.id}` : "clients",
        newData,
        initialData ? "PUT" : "POST"
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
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
    <main className="flex-1 bg-gray-100 p-6 overflow-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          mutation.mutate(values, {
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

export default ClientForm;
