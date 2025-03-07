import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { IEmployee } from "../../../interfaces/users";
import BreadCrumb from "../../BreadCrumb";
import EmployeeForm from "./EmployeeForm";
import Modal from "../../Modal";
import DeleteConfirmation from "./DeleteConfirmation";
import CircularLoader from "../../Loaders/Circular";
import { getData } from "../../../utils/apiRequests";
import { SquarePen, Trash2 } from "lucide-react";

const EmployeeTable: React.FC = () => {
  const {
    data: employees,
    error: employeesError,
    isLoading: employeesLoading,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getData("employees"),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );

  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "role", header: "Role" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-4">
          <span
            className="text-blue-600 hover:text-blue-800 transition duration-300 cursor-pointer"
            onClick={() => {
              setSelectedEmployee(row.original);
              openModal("edit-employee", row.original);
            }}
          >
            <SquarePen />
          </span>
          <span
            className="text-red-600 hover:text-red-800 transition duration-300 cursor-pointer"
            onClick={() => {
              setSelectedEmployee(row.original);
              openModal("delete-employee", row.original);
            }}
          >
            <Trash2 />
          </span>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: employees?.payload ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (employeesLoading)
    return (
      <p className="text-center text-gray-500">
        <CircularLoader />
      </p>
    );

  if (employeesError)
    return <p className="text-red-500">{(employeesError as Error).message}</p>;

  const openModal = (type: string, data: IEmployee | null = null) => {
    setFormType(type);
    setSelectedEmployee(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <BreadCrumb page="Employees" />
      <div className="my-12 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Employees
          </h6>
        </div>
        <div className="mb-4">
          <div className="flex justify-end mb-8 mr-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              onClick={() => openModal("create-employee")}
            >
              Add Employee
            </button>
          </div>
          <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-100">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="border-b border-blue-gray-50 py-3 px-6 text-left"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="text-sm hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="py-3 px-5 border-b border-blue-gray-50"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              {/* <button
                onClick={previousPage}
                disabled={!canPreviousPage}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {pageIndex + 1} of {pageOptions.length}
              </span>
              <button
                onClick={nextPage}
                disabled={!canNextPage}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        formType={formType}
      >
        {formType === "create-employee" && <EmployeeForm />}
        {formType === "edit-employee" && (
          <EmployeeForm
            initialData={selectedEmployee as IEmployee | undefined}
          />
        )}
        {formType === "delete-employee" && (
          <DeleteConfirmation
            id={selectedEmployee?.id || ""}
            name={selectedEmployee?.name || ""}
            close={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default EmployeeTable;
