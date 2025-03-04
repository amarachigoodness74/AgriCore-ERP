import { ReactNode } from "react";

const Modal = ({
  isOpen,
  close,
  formType,
  children,
}: {
  isOpen: boolean;
  close: () => void;
  formType: string;
  children: ReactNode;
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-h-[95vh] w-full max-w-xl overflow-auto">
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
        <div className="py-4">{children}</div>
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
