import React, { useState } from "react";
import DashboardLayout from "../../../layouts/Dashboard";

const PurchaseOrderForm: React.FC = () => {
  const [formData, setFormData] = useState({
    supplier: "",
    products: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Purchase Order created:", formData);
  };

  return (
    <DashboardLayout>
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Purchase Orders
          </h2>
        </div>
        <form
          className="bg-white p-6 shadow rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-4">Create Purchase Order</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Supplier</label>
            <select
              name="supplier"
              className="w-full border p-2 rounded"
              value={formData.supplier}
              onChange={handleChange}
            >
              <option value="">Select Supplier</option>
              <option value="Tech Supplies Inc.">Tech Supplies Inc.</option>
              <option value="Gadget World">Gadget World</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Products</label>
            <input
              type="text"
              name="products"
              className="w-full border p-2 rounded"
              value={formData.products}
              onChange={handleChange}
              placeholder="E.g., 5 x Laptops"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              className="w-full border p-2 rounded"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      </main>
    </DashboardLayout>
  );
};

export default PurchaseOrderForm;
