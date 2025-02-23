import React from "react";

const SupplierList: React.FC = () => {
  const suppliers = [
    { id: 1, name: "Tech Supplies Inc.", contact: "tech@supplies.com" },
    { id: 2, name: "Gadget World", contact: "info@gadgetworld.com" },
  ];

  return (
    <main className="flex-1 bg-gray-100 p-6 overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Suppliers</h2>
      </div>
      <div className="flex justify-end mb-5">
        <a
          href="/inventory/suppliers/add"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          // disabled={isSubmitting}
        >
          Add Supplier
        </a>
      </div>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="border-t">
              <td className="px-4 py-2">{supplier.name}</td>
              <td className="px-4 py-2">{supplier.contact}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default SupplierList;
