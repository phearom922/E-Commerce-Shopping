import React, { useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductTableCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleChangeCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;
    if (count > item.quantity) {
      toast.error(item.title + " Have in stock : " + item.quantity);
      return;
    }

    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id == item._id) {
        cart[i].count = count;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };
  //============Remove Cart=============
  const handleRemoveCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id == item._id) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  return (
    <tbody>
      <tr className="border-neutral-2 text-[#4b5563]">
        <td className="flex items-center gap-2 px-6 py-3 font-medium whitespace-nowrap">
          <Link to={"/product-detail/" + item._id}>
            <div className="h-14 w-14 rounded-md bg-gray-100">
              <img
                src={item.images[0]?.url}
                alt=""
                className="w-full object-cover"
              />
            </div>
          </Link>

          <div className="text-sm">
            {item.title} <br />
            <span className="text-xs text-gray-400">
              {item.productCode}
              {item.discount ? (
                <span className="mx-1 bg-red-700 px-1 text-xs text-white">
                  -{item.discount}%
                </span>
              ) : (
                ""
              )}
            </span>
          </div>
        </td>

        <td className="px-6 py-3 text-[16px] font-medium whitespace-nowrap">
          $
          {item.discount
            ? (item.price - (item.price * item.discount) / 100).toFixed(2)
            : item.price.toFixed(2)}
        </td>

        <td className="items-center gap-1 px-6 py-3 text-[16px] font-medium">
          <input
            onChange={handleChangeCount}
            value={item.count}
            type="number"
            className="w-12 rounded border border-gray-300 py-2 pl-3 text-center"
          />
          {/* <div className="flex items-center gap-1">
            <FaCircleMinus  className=" cursor-pointer" />
            
            <FaCirclePlus onClick={handlePlus} className=" cursor-pointer"/>
          </div> */}
        </td>

        <td className="px-6 py-3 text-[16px] font-medium whitespace-nowrap">
          $
          {item.discount
            ? (
                (item.price - (item.price * item.discount) / 100) *
                item.count
              ).toFixed(2)
            : (item.count * item.price).toFixed(2)}
        </td>
        <td className="gap-2 px-6 whitespace-nowrap">
          <svg
            onClick={handleRemoveCart}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7 cursor-pointer rounded-xs bg-gray-200 p-1.5 hover:bg-gray-300"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </td>
      </tr>
    </tbody>
  );
};

export default ProductTableCart;
