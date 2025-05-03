import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import { FaRegUser, FaRegHeart, FaBuffer } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const UserDropdown = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // ปิดเมนูเมื่อคลิกนอก
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 font-semibold text-white shadow hover:bg-indigo-700"
      >
        {user.username}
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="group absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl bg-white shadow-lg ring-1 ring-black/10">
          <div className="space-y-2 px-4 py-3 text-gray-800 group-hover:cursor-pointer">
            <DropdownLink icon={<FaRegUser />} to="/user/index">
              Profile
            </DropdownLink>
            <DropdownLink icon={<RxDashboard />} to="/user/dashboard">
              My Dashboard
            </DropdownLink>
            <DropdownLink icon={<FaRegHeart />} to="/user/wishlist">
              Wishlist
            </DropdownLink>
            <DropdownLink icon={<FaBuffer />} to="/user/my-order">
              My Orders
            </DropdownLink>
            <DropdownLink
              icon={<Settings className="h-4 w-4" />}
              to="/user/settings"
            >
              Settings
            </DropdownLink>
          </div>
          <div
            onClick={logout}
            className="border-t border-gray-300 px-4 py-2 text-gray-800"
          >
            <DropdownLink icon={<LogOut className="h-4 w-4 cursor-pointer" />}>
              Logout
            </DropdownLink>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Dropdown Item Component
const DropdownLink = ({ icon, to, children }) => {
  return (
    <Link
      to={to}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-600"
    >
      <span className="text-lg">{icon}</span>
      {children}
    </Link>
  );
};

export default UserDropdown;
