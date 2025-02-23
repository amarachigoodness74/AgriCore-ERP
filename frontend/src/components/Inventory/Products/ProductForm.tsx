import React, { useState } from "react";

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    stock: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product saved:", formData);
  };

  return (
    <main className="flex-1 bg-gray-100 p-6 overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
      </div>
      <form className="bg-white p-6 shadow rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
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
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            className="w-full border p-2 rounded"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            className="w-full border p-2 rounded"
            value={formData.price}
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
  );
};

export default ProductForm;
