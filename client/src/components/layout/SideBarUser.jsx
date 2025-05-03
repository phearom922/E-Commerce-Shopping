import React, { Children } from "react";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import {
  FaRegUser,
  FaRegHeart,
  FaBuffer,
  FaRegSun,
} from "react-icons/fa";

const SideBarUser = ({ Children }) => {
  const menuItem = [
    {
      path: "/user/index",
      name: "Profile",
      icon: <FaRegUser />,
    },
    {
      path: "/user/dashboard",
      name: "My Dashboard",
      icon: <RxDashboard />,
    },
    {
      path: "/user/wishlist",
      name: "Wishlist",
      icon: <FaRegHeart />,
    },
    {
      path: "/user/my-order",
      name: "My Orders",
      icon: <FaBuffer />,
    },
    {
      path: "/user/settings",
      name: "Settings",
      icon: <FaRegSun />,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="min-h-screen bg-gray-50 w-60 space-y-1 py-5 rounded-xl sm:px-6 lg:px-5">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="flex transform cursor-pointer items-center gap-2 rounded-md px-4 py-2 font-semibold text-gray-800 transition-all duration-300 hover:translate-x-0.5 hover:bg-gray-200"
          >
            <div>{item.icon}</div>
            <div>{item.name}</div>
          </NavLink>
        ))}
      </div>
      
    </div>
  );
};

export default SideBarUser;
