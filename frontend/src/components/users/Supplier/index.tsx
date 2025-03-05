import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import BreadCrumb from "../../BreadCrumb";
import SupplierForm from "./SupplierForm";
import Modal from "../../Modal";
import DeleteConfirmation from "./DeleteConfirmation";
import CircularLoader from "../../Loaders/Circular";
import { getData } from "../../../utils/apiRequests";
import { ISupplier } from "../../../interfaces/users";
import { demoEmployees } from "../../../demo-data/employees";

const SupplierTable: React.FC = () => {
  // const {
  //   data: suppliers,
  //   error: suppliersError,
  //   isLoading: suppliersLoading,
  // } = useQuery({
  //   queryKey: ["suppliers"],
  //   queryFn: () => getData("suppliers"),
  // });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(null);

  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-4">
          <span
            className="text-blue-600 hover:text-blue-800 transition duration-300 cursor-pointer"
            onClick={() => {
              setSelectedSupplier(row.original);
              openModal("edit-supplier", row.original);
            }}
          >
            <SquarePen />
          </span>
          <span
            className="text-red-600 hover:text-red-800 transition duration-300 cursor-pointer"
            onClick={() => {
              setSelectedSupplier(row.original);
              openModal("delete-supplier", row.original);
            }}
          >
            <Trash2 />
          </span>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    // data: suppliers?.payload ?? [],
    data: demoEmployees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // if (suppliersLoading)
  //   return (
  //     <p className="text-center text-gray-500">
  //       <CircularLoader />
  //     </p>
  //   );

  // if (suppliersError)
  //   return <p className="text-red-500">{(suppliersError as Error).message}</p>;

  const openModal = (type: string, data: ISupplier | null = null) => {
    setFormType(type);
    setSelectedSupplier(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <BreadCrumb page="Suppliers" />
      <div className="my-12 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Suppliers
          </h6>
        </div>
        <div className="mb-4">
          <div className="flex justify-end mb-8 mr-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              onClick={() => openModal("create-supplier")}
            >
              Add Supplier
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
        {formType === "create-supplier" && <SupplierForm />}
        {formType === "edit-supplier" && (
          <SupplierForm initialData={selectedSupplier as ISupplier | undefined} />
        )}
        {formType === "delete-supplier" && (
          <DeleteConfirmation
            id={selectedSupplier?.id || ""}
            name={selectedSupplier?.name || ""}
            close={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default SupplierTable;
