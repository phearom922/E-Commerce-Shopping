import React from "react";
import SideBarUser from "./SideBarUser";

const RootLayoutUser = ({ children }) => {
  return (
    <div className="mx-auto my-16 flex max-w-7xl space-x-5 px-4 sm:px-6 lg:px-8">
      <div>
        <SideBarUser />
      </div>
      <main className="w-full">{children}</main>
    </div>
  );
};

export default RootLayoutUser;
