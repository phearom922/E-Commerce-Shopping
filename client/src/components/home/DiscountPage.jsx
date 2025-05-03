import React from "react";
import Discount from "../../../public/discount.png";

//Motion
import {motion} from "framer-motion"



const DiscountPage = () => {
  return (
    <div className="mt-16 rounded-2xl bg-indigo-50 shadow-md">
      <motion.div 
      initial={{opacity:0.5, translateX: -50}}
      whileInView={{opacity:1, translateX: 0}}
      transition={{duration:1}}
      viewport={{once:true}}
      
      className="flex h-72 grid-cols-2">
        <div className="flex w-full items-center justify-center">
          <img
            src={Discount}
            alt="discount-image"
            className="w-60 object-center"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center space-y-4">
          <h1 className="text-center text-3xl font-semibold">
            Discount <span className="text-4xl text-red-500">50%</span> <br />
            On New Products
          </h1>
          <button
            id="button"
            className="relative cursor-pointer rounded bg-indigo-700 p-4 font-semibold text-white"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DiscountPage;
