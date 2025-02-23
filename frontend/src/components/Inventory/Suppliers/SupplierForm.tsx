import React, { useState } from "react";
import DashboardLayout from "../../../layouts/Dashboard";

const SupplierForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Supplier saved:", formData);
  };

  return (
    <DashboardLayout>
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Suppliers</h2>
        </div>
        <form
          className="bg-white p-6 shadow rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-4">Add Supplier</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border p-2 rounded"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact</label>
            <input
              type="email"
              name="contact"
              className="w-full border p-2 rounded"
              value={formData.contact}
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

export default SupplierForm;
