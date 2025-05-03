import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import {
  FaRegUser,
  FaHeart,
  FaBullhorn,
  FaRegFileAlt,
  FaCreditCard,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    // 👉 ตัวอย่าง: ล้าง token แล้วไปหน้า login
    localStorage.removeItem("token");
    navigate("/login");
  };












  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 font-semibold text-white shadow hover:bg-orange-600"
      >
        RON
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl bg-white shadow-lg ring-1 ring-black/10">
          <div className="space-y-2 px-4 py-3 text-orange-500">
            <DropdownLink icon={<FaRegUser />} to="/profile">
              โปรไฟล์
            </DropdownLink>
            <DropdownLink icon={<FaHeart />} to="/my-courses">
              คอร์สของฉัน
            </DropdownLink>
            <DropdownLink icon={<FaBullhorn />} to="/certificates">
              ใบประกาศฯ
            </DropdownLink>
            <DropdownLink icon={<FaRegFileAlt />} to="/favorite-courses">
              คอร์สโปรดของฉัน
            </DropdownLink>
            <DropdownLink icon={<FaCreditCard />} to="/payments">
              การชำระเงิน
            </DropdownLink>
            <DropdownLink
              icon={<Settings className="h-4 w-4" />}
              to="/settings"
            >
              การตั้งค่า
            </DropdownLink>
          </div>
          <div className="border-t px-4 py-2 text-orange-500">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-orange-50"
            >
              <LogOut className="h-4 w-4" />
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 👉 Component สำหรับลิงก์ภายในเมนู
const DropdownLink = ({ icon, to, children }) => (
  <Link
    to={to}
    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-orange-50"
  >
    <span className="text-lg">{icon}</span>
    {children}
  </Link>
);

export default UserDropdown;
