import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TfiFaceSad } from "react-icons/tfi";

const NoProductNotFound = () => {
  return (
    <div className="flex h-screen w-7xl items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center pb-20 text-neutral-400">
        <div className="relative">
          <HiOutlineShoppingBag size={200} />
          <div className="absolute left-20 top-26">
          <TfiFaceSad size={40}/>
          </div>
        </div> 
        <h1 className="text-4xl font-semibold">No Products Found!</h1>
        <p className="text-center">
          Your search did not match any products <br />
          Please tray again
        </p>
      </div>
    </div>
  );
};

export default NoProductNotFound;
