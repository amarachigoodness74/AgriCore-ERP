import UserRoleForm from "./UserRoleForm";
import PermissionForm from "./PermissionForm";
import DeleteConfirmation from "./DeleteConfirmation";
import { IPermission, IPermissionIRole, IUserRole } from "../interfaces/types";

const Modal = ({
  isOpen,
  close,
  formType,
  initialData,
  permissions,
}: {
  isOpen: boolean;
  close: () => void;
  formType: string;
  initialData?: IPermission | IUserRole;
  permissions: IPermissionIRole[];
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center border-b pb-3">
          {formType && (
            <h2 className="text-xl font-semibold">
              {formType.replace("-", " ").toUpperCase()}
            </h2>
          )}
          <button
            onClick={handleClose}
            className="bg-gray-300 text-gray-800 hover:bg-gray-400 py-1 px-2"
          >
            &times;
          </button>
        </div>
        <div className="py-4">
          {formType === "create-user-role" && (
            <UserRoleForm permissions={permissions} />
          )}
          {formType === "create-permission" && <PermissionForm />}
          {formType === "edit-permission" && (
            <PermissionForm initialData={initialData as IPermission} />
          )}
          {formType === "edit-user-role" && (
            <UserRoleForm
              initialData={initialData as IUserRole}
              permissions={permissions}
            />
          )}
          {(formType === "delete-permission" ||
            formType === "delete-user-role") && (
            <DeleteConfirmation
              initialData={initialData as IPermissionIRole}
              close={() => handleClose()}
            />
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
