import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white flex flex-col p-4 transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <h1 className="text-2xl font-bold mb-4">ERP Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded-md">
            <a href="/dashboard" className="block">
              <FontAwesomeIcon icon={faDashboard} />
              &nbsp; Dashboard
            </a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded-md">
            <a href="/inventory/products" className="block">
              Products
            </a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded-md">
            <a href="/inventory/suppliers" className="block">
              Suppliers
            </a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded-md">
            <a href="/inventory/purchase-orders" className="block">
              Purchase Orders
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
