import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { IEmployee } from "../../interfaces/employee";
import { demoEmployees } from "../../demo-data/employees";
import { Link } from "react-router-dom";

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
    <main className="flex-1 bg-gray-100 p-6 overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Employees</h2>
      </div>
      <div className="flex justify-end mb-5">
        <Link
          to="/employees/add"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Add Employee
        </Link>
      </div>
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-2 text-left cursor-pointer"
                >
                  {column.render("Header")}{" "}
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="p-2"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
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
    </main>
  );
};

export default EmployeeTable;
