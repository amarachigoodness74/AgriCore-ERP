import React from "react";

const PurchaseOrderList: React.FC = () => {
  const purchaseOrders = [
    {
      id: 1,
      supplier: "Tech Supplies Inc.",
      date: "2025-01-10",
      total: 3000,
    },
    {
      id: 2,
      supplier: "Gadget World",
      date: "2025-01-05",
      total: 500,
    },
  ];

  return (
    <main className="flex-1 bg-gray-100 p-6 overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Purchase Orders
        </h2>
      </div>
      <div className="flex justify-end mb-5">
        <a
          href="/inventory/purchase-orders/add"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          // disabled={isSubmitting}
        >
          Add Purchase Order
        </a>
      </div>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Supplier</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-2">{order.date}</td>
              <td className="px-4 py-2">{order.supplier}</td>
              <td className="px-4 py-2">${order.total}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-blue-500 hover:underline">View</button>
                <button className="text-red-500 hover:underline">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default PurchaseOrderList;
