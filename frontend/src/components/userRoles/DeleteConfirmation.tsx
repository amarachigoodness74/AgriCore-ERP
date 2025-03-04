import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { deleteData } from "../../utils/apiRequests";

const DeleteSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const DeleteConfirmation = ({
  id,
  name,
  type,
  close,
}: {
  id: string;
  name: string;
  type: string;
  close: () => void;
}) => {
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const mutation = useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => deleteData(id, type ? "user-role" : "permissions"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRoles"] });
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      close();
    },
    onError: (error) => {
      setError(`Error submitting form: ${error.message}`);
    },
  });

  return (
    <div>
      <h2 className="font-semibold text-md mb-3">
        Are you sure you want to delete this?
      </h2>
      <h4 className="font-semibold text-sm">
        If yes, type in{" "}
        <span className="bg-gray-200 text-gray-800 p-2 rounded-lg font-bold">
          {name}
        </span>
      </h4>

      <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={DeleteSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (values.name !== name) {
              setError("Please enter the correct value");
            }
            mutation.mutate(id, {
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
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="name"
                  className="w-full border border-red-300 outline-red-400 rounded-lg p-2 mt-1"
                  placeholder="Enter name"
                />
                <ErrorMessage
                  name="name"
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
                className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                disabled={isSubmitting || mutation.isPending}
              >
                {isSubmitting || mutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
