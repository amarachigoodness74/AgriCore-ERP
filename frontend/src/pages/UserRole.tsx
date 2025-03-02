import React, { useEffect, useState } from "react";
import axios from "axios";
import { withAuthContext } from "../context/auth/AuthContext";
import { SquarePen, Trash2 } from "lucide-react";
import BreadCrumb from "../components/BreadCrumb";
import CircularLoader from "../components/Loaders/Circular";
import Modal from "../components/Modal";
import { IPermission, IUserRole } from "../interfaces/types";
import { IAuthContextType } from "../interfaces/authContext";

const API_URL = import.meta.env.VITE_API_URL;

type authProps = {
  authContext: IAuthContextType;
};

const UserRoleWithAuth = ({ authContext }: authProps) => {
  console.log("============", authContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const [selectedData, setSelectedData] = useState<
    IPermission | IUserRole | null
  >(null);
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [userRoles, setUserRoles] = useState<IUserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [permissionsRes, userRolesRes] = await Promise.all([
          axios.get(`${API_URL}/permissions`),
          axios.get(`${API_URL}/user-role`),
        ]);

        setPermissions(permissionsRes.data.payload);
        setUserRoles(userRolesRes.data.payload);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isModalOpen]);

  if (loading)
    return (
      <p className="text-center text-gray-500">
        <CircularLoader />
      </p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const openModal = (
    type: string,
    data: IPermission | IUserRole | null = null
  ) => {
    setFormType(type);
    setSelectedData(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <BreadCrumb page="User Role" />
      {/* User Role Table */}
      <div className="my-12 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            User Roles
          </h6>
        </div>
        <div className="mb-4">
          <div className="flex justify-end mb-8 mr-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              onClick={() => openModal("create-user-role")}
            >
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
                  {userRoles.length > 0 &&
                    userRoles.map((userRole: IUserRole) => (
                      <tr key={userRole.id} className="text-sm">
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          {userRole.role}
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
                          {userRole.description}
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <div className="flex justify-center items-center gap-4">
                            <span className="text-blue-600 hover:text-blue-800 transition duration-300 cursor-pointer">
                              <SquarePen
                                onClick={() => {
                                  setSelectedData(userRole);
                                  openModal("edit-user-role", userRole);
                                }}
                              />
                            </span>
                            <span className="text-red-600 hover:text-red-800 transition duration-300 cursor-pointer">
                              <Trash2
                                onClick={() => {
                                  openModal("delete-user-role", userRole);
                                }}
                              />
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

      {/* Permissions Table */}
      <div className="mt-24">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
              Permissions
            </h6>
          </div>
          <div className="mb-4">
            <div className="flex justify-end mb-8 mr-4">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
                onClick={() => openModal("create-permission")}
              >
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
                          Name
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                          Group
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
                    {permissions.length > 0 &&
                      permissions.map((permission: IPermission) => (
                        <tr key={permission?.id} className="text-sm">
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            {permission.name}
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            {permission.group}
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            {permission.description}
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex justify-center items-center gap-4">
                              <span className="text-blue-600 hover:text-blue-800 transition duration-300 cursor-pointer">
                                <SquarePen
                                  onClick={() => {
                                    setSelectedData(permission);
                                    openModal("edit-permission", permission);
                                  }}
                                />
                              </span>
                              <span className="text-red-600 hover:text-red-800 transition duration-300 cursor-pointer">
                                <Trash2
                                  onClick={() => {
                                    openModal("delete-permission", permission);
                                  }}
                                />
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

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType={formType}
        initialData={selectedData}
      />
    </>
  );
};

const UserRole = withAuthContext(UserRoleWithAuth);

export default UserRole;
