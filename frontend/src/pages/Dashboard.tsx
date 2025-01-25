import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faShoppingCart,
  faTruck,
  faUsers,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../layouts/Dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [120, 190, 300, 250, 220, 400],
        backgroundColor: "rgba(93, 102, 255, 0.8)",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Sales Overview",
      },
    },
  };

  const tableData = [
    { id: 1, name: "Product A", sales: 150, revenue: "$450" },
    { id: 2, name: "Product B", sales: 200, revenue: "$600" },
    { id: 3, name: "Product C", sales: 120, revenue: "$360" },
  ];
  const totalProducts = 5,
    pendingOrders = 12,
    totalSuppliers = 17,
    totalClients = 10;
  // revenue = 18;

  return (
    <DashboardLayout>
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-gray-600">Welcome back, Admin!</p>
        </div>

        {/* Charts */}
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-md rounded-lg p-4 flex justify-between">
              <FontAwesomeIcon
                icon={faBox}
                className="text-4xl text-blue-500 mr-4"
              />
              <div className="flex flex-col justify-between items-end">
                <h2 className="text-sm font-medium text-gray-600">
                  Total Products in Inventory
                </h2>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {totalProducts}
                </p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-4xl text-yellow-500 mr-4"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-600">
                  Pending Orders
                </h2>
                <p className="text-3xl font-bold text-yellow-500 mt-2">
                  {pendingOrders}
                </p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
              <FontAwesomeIcon
                icon={faTruck}
                className="text-4xl text-green-500 mr-4"
              />
              <div>
                <h2 className="text-xs font-medium text-gray-600">
                  Total Suppliers
                </h2>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {totalSuppliers}
                </p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-4xl text-purple-500 mr-4"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-600">
                  Total Clients
                </h2>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {totalClients}
                </p>
              </div>
            </div>
            {/* <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="text-4xl text-green-500 mr-4"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-600">
                  Revenue (Month-to-Date)
                </h2>
                <p className="text-3xl font-bold text-green-500 mt-2">
                  ${revenue.toLocaleString()}
                </p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Charts and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          {/* Placeholder for Other Stats */}
          <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
            <h3 className="text-gray-500">Additional Stats</h3>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Recent Sales
          </h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm text-gray-600">
                <th className="p-2">#</th>
                <th className="p-2">Product</th>
                <th className="p-2">Sales</th>
                <th className="p-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id} className="border-t text-sm">
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.sales}</td>
                  <td className="p-2">{item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <Outlet /> */}
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
