import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTable, useSortBy, usePagination } from "react-table";
import { IEmployee } from "../../../interfaces/employee";
import BreadCrumb from "../../BreadCrumb";
import EmployeeForm from "./EmployeeForm";
import Modal from "../../Modal";
import DeleteConfirmation from "./DeleteConfirmation";
import CircularLoader from "../../Loaders/Circular";
import { getData } from "../../../utils/apiRequests";
import { demoEmployees } from "../../../demo-data/employees";
import { SquarePen, Trash2 } from "lucide-react";

const EmployeeTable: React.FC = () => {
  const {
    data: employeesss,
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

  const employees: IEmployee[] = demoEmployees;

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Department", accessor: "department" },
      { Header: "Role", accessor: "role" },
      {
        Header: "Status",
        accessor: "isActive",
        Cell: ({ value }: { value: boolean }) =>
          value ? "Active" : "Inactive",
      },
      {
        Header: "Actions",
        cell: (row) => (
          <div className="flex justify-center items-center gap-4">
            <span
              className="text-blue-600 hover:text-blue-800 transition duration-300 cursor-pointer"
              onClick={() => {
                setSelectedEmployee(row);
                openModal("edit-employee", row);
              }}
            >
              <SquarePen />
            </span>
            <span
              className="text-red-600 hover:text-red-800 transition duration-300 cursor-pointer"
              onClick={() => {
                setSelectedEmployee(row);
                openModal("delete-employee", row);
              }}
            >
              <Trash2 />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable({ columns, data: employees }, useSortBy, usePagination);

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
    setSelectedData(data);
    setIsModalOpen(true);
  };

  console.log("====== employeesss", employeesss.payload);

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
              <table
                {...getTableProps()}
                className="w-full min-w-[640px] table-auto"
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="bg-gray-200"
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="cursor-pointer border-b border-blue-gray-50 py-3 px-6 text-left"
                        >
                          {column.render("Header")}{" "}
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className="hover:bg-gray-100 text-sm"
                      >
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="py-3 px-5 border-b border-blue-gray-50"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
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
              </button>
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
        {formType === "edit-permission" && (
          <EmployeeForm initialData={selectedData as IEmployee | undefined} />
        )}
        {formType === "delete-permission" && (
          <DeleteConfirmation
            id={selectedData?.id || ""}
            name={selectedData?.name || ""}
            close={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default EmployeeTable;
