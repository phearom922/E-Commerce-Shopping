
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaMicrosoft,
  FaSwatchbook,
  FaUserLock,
  FaPlusSquare,
  FaTshirt,
  FaLayerGroup
} from "react-icons/fa";

const SideBarAdmin = () => {
  const menuItem = [
    {
      path: "/admin/index",
      name: "Dashboard",
      icon: <FaMicrosoft />,
    },
    {
      path: "/admin/manage-admin",
      name: "Manage Admin",
      icon: <FaUserLock />,
    },
    {
      path: "/admin/manage-order",
      name: "Manage Order",
      icon: <FaLayerGroup />,
    },
    {
      path: "/admin/create-category",
      name: "Category",
      icon: <FaSwatchbook />,
    },
    {
      path: "/admin/create-product",
      name: "Add Product",
      icon: <FaPlusSquare />,
    },
    {
      path: "/admin/all-product",
      name: "All Product",
      icon: <FaTshirt />,
    },
  ];

  return (
    <div>
      <div>
        <div className="sticky h-screen w-72 flex-col justify-between bg-gray-50 py-1 shadow">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="mx-2 flex transform cursor-pointer items-center gap-3 rounded p-3 font-semibold text-gray-800 transition-all duration-300 hover:translate-x-0.5 hover:bg-gray-200"
            >
              <div>{item.icon}</div>
              <div>{item.name}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBarAdmin;
