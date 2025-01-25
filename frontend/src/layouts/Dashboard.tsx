// Dashboard.tsx

import React, { ReactNode, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../components/Sidebar";
// import { Outlet } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMenu}
        className="md:hidden absolute top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
      >
        ☰
      </button>

      {/* Left Sidebar */}
      <Sidebar isMenuOpen={isMenuOpen} />

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Main Content */}
      {children}
    </div>
  );
};

export default DashboardLayout;
