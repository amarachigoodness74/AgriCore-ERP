import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import menuItems from "../utils/routes";

const Sidebar = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white flex flex-col p-4 transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <h1 className="text-purple-400 text-xl font-bold underline decoration-wavy underline-offset-8 mb-4">
        AgriCore ERP
      </h1>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              {item.children ? (
                <>
                  <div className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-700">
                    <Link
                      to={item.path as string}
                      className="block px-3 py-2 rounded hover:bg-gray-700"
                    >
                      {item.icon && (
                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
                      )}
                      {item.title}
                    </Link>
                    <button onClick={() => toggleDropdown(item.title)}>
                      {openDropdown === item.title ? (
                        <ChevronDown />
                      ) : (
                        <ChevronRight />
                      )}
                    </button>
                  </div>
                  {openDropdown === item.title && (
                    <ul className="ml-4 mt-2 border-l border-gray-600">
                      {item.children.map((subItem, subIndex) => (
                        <li key={subIndex} className="mb-1">
                          <Link
                            to={subItem.path}
                            className="block px-3 py-1 hover:bg-gray-700 rounded"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path as string}
                  className="block px-3 py-2 rounded hover:bg-gray-700"
                >
                  {item.icon && (
                    <FontAwesomeIcon icon={item.icon} className="mr-2" />
                  )}
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
