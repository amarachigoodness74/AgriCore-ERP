import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { IEmployee } from "../../interfaces/employee";
import { demoEmployees } from "../../demo-data/employees";
import { Link } from "react-router-dom";
import BreadCrumb from "../BreadCrumb";

// const EmployeeTable: React.FC<{ employees: IEmployee[] }> = ({ employees }) => {
const EmployeeTable: React.FC = () => {
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

  return (
    <>
      <BreadCrumb page="Employees" />
      <div className="flex justify-end mb-5">
        <Link
          to="/employees/add"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Add Employee
        </Link>
      </div>
      <div className="my-12 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <table
          {...getTableProps()}
          className="w-full border-collapse table-auto"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-200"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
    </>
  );
};

export default EmployeeTable;
