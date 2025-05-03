import React from "react";
import ProfileUserLogin from "../../layout/ProfileUserLogin";
import brandLogo from "../../../../public/Brand_Logo.png"
import { Link } from "react-router-dom";



const MenuAdmin = () => {
  return (
    <div className="z-50 flex h-14 w-full items-center fixed justify-between bg-white px-2">
      <div className="flex items-center justify-center space-x-2">
        <Link to="#" className="font-semibold text-gray-700" href="/">
          <img className="w-32 pl-2" src={brandLogo} alt="logo" />
        </Link>
      </div>
      <div>
        <ProfileUserLogin />
      </div>
    </div>
  );
};

export default MenuAdmin;
