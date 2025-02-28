import React from "react";
import { withAuthContext } from "../context/auth/AuthContext";
import { IAuthContextType } from "../interfaces/authContext";
import { SquarePen, Trash2 } from "lucide-react";
import BreadCrumb from "../components/BreadCrumb";

type authProps = {
  authContext: IAuthContextType;
};

const DashboardWithAuth = ({ authContext }: authProps) => {
  console.log("============", authContext);

  const tableData = [
    {
      id: 1,
      role: "Product A",
      // members: 150,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis perferendis cumque molestiae",
    },
    {
      id: 2,
      role: "Product B",
      // members: 200,
      description:
        "Klie recusandae sit quidem eum excepturi asperiores sint tempore",
    },
    {
      id: 3,
      role: "Product C",
      // members: 120,
      description:
        "Quis perferendis cumque molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
  ];

  return (
    <>
     <BreadCrumb page="User Role" />
      {/* Table */}
      <div className="my-12 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            User Roles
          </h6>
        </div>
        <div className="mb-4">
          <div className="flex justify-end mb-8 mr-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
              Create User Role
            </button>
          </div>
          <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                        #
                      </p>
                    </th>
                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                        Role
                      </p>
                    </th>
                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                        Members
                      </p>
                    </th>
                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                        Description
                      </p>
                    </th>
                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                        Actions
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item.id} className="text-sm">
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        {item.id}
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        {item.role}
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <img
                          src="/material-tailwind-dashboard-react/img/team-1.jpeg"
                          alt="Romina Hadid"
                          className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white"
                        />
                        <img
                          src="/material-tailwind-dashboard-react/img/team-2.jpeg"
                          alt="Ryan Tompson"
                          className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white -ml-2.5"
                        />
                        <img
                          src="/material-tailwind-dashboard-react/img/team-3.jpeg"
                          alt="Jessica Doe"
                          className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white -ml-2.5"
                        />
                        <img
                          src="/material-tailwind-dashboard-react/img/team-4.jpeg"
                          alt="Alexander Smith"
                          className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white -ml-2.5"
                        />
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        {item.description}
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="flex justify-center items-center gap-4">
                          <span className="text-blue-600 hover:text-blue-800 transition duration-300 cursor-pointer">
                            <SquarePen />
                          </span>
                          <span className="text-red-600 hover:text-red-800 transition duration-300 cursor-pointer">
                            <Trash2 />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-24">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
              Permissions
            </h6>
          </div>
          <div className="mb-4">
            <div className="flex justify-end mb-8 mr-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                Create Permission
              </button>
            </div>
            <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
              <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          #
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          Role
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          Members
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          Description
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          Actions
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item) => (
                      <tr key={item.id} className="text-sm">
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          {item.id}
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          {item.role}
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <img
                            src="/material-tailwind-dashboard-react/img/team-1.jpeg"
                            alt="Romina Hadid"
                            className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white"
                          />
                          <img
                            src="/material-tailwind-dashboard-react/img/team-2.jpeg"
                            alt="Ryan Tompson"
                            className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white -ml-2.5"
                          />
                          <img
                            src="/material-tailwind-dashboard-react/img/team-3.jpeg"
                            alt="Jessica Doe"
                            className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white -ml-2.5"
                          />
                          <img
                            src="/material-tailwind-dashboard-react/img/team-4.jpeg"
                            alt="Alexander Smith"
                            className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white -ml-2.5"
                          />
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          {item.description}
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <div className="flex justify-center items-center gap-4">
                            <span className="text-blue-600 hover:text-blue-800 transition duration-300 cursor-pointer">
                              <SquarePen />
                            </span>
                            <span className="text-red-600 hover:text-red-800 transition duration-300 cursor-pointer">
                              <Trash2 />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Dashboard = withAuthContext(DashboardWithAuth);

export default Dashboard;
