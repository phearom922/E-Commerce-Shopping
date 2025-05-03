import React from "react";
import ProductTableCart from "../card/ProductTableCart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
//Function
import { userCart } from "../functions/users";
import Footer from "../footer/Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const getTotalDiscount = () => {
    return cart.reduce((currentValue, nextValue) => {
      return (
        currentValue +
        ((nextValue.discount * nextValue.price) / 100) * nextValue.count
      );
    }, 0);
  };

  //=================Save Order================

  const handleSaveOrder = () => {
    alert("Check Out Order");
    userCart(user.token, cart)
      .then((res) => {
        console.log(res.data);
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="mx-auto grid min-w-7xl grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
        <div className="col-span-2 mt-16">
          {/* Title Your Card */}
          <div className="mx-5 flex items-center justify-between border-b-1 border-b-neutral-300 py-5">
            <h1 className="text-2xl font-semibold text-[#4b5563]">
              Your <span className="text-pink-700">Cart</span>
            </h1>
            <p className="text-xl font-semibold text-[#4b5563]">
              {cart.length} Items
            </p>
          </div>

          {/* Product Order List */}
          <div>
            <table className="text-surface min-w-full overflow-hidden text-left text-sm font-light">
              <thead className="font-medium text-[#4b5563]">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Product Detail
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Price
                  </th>

                  <th scope="col" className="px-6 py-4">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Subtotal
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Remove
                  </th>
                </tr>
              </thead>
              {cart.map((item, index) => (
                <ProductTableCart item={item} key={item._id} />
              ))}
            </table>
          </div>
        </div>

        <div className="sticky top-20 col-span-1 mt-16 h-96 rounded-md bg-gray-100  p-6">
          <h1 className="flex items-center gap-2 border-b-1 border-b-neutral-300 pb-5 text-2xl font-semibold text-[#4b5563]">
            <HiShoppingBag size={30} /> Order Summary
          </h1>

          <div className="space relative">
            <div className="space-y-2 py-5">
              <div className="flex justify-between text-[#4b5563]">
                <h1>Price Before Discount</h1>
                <h1 className="font-semibold">${getTotal().toFixed(2)}</h1>
              </div>
              <div className="flex justify-between text-[#4b5563]">
                <h1>Shipping Fee</h1>
                <h1 className="font-semibold">Free</h1>
              </div>
              <div className="flex justify-between text-[#4b5563]">
                <h1>Tax(2%)</h1>
                <h1 className="font-semibold">0</h1>
              </div>
              <div className="flex justify-between text-[#4b5563]">
                <h1>Discount</h1>
                <h1 className="font-semibold">
                  {getTotalDiscount() ? (
                    <span className="text-red-600">
                      -${getTotalDiscount().toFixed(2)}
                    </span>
                  ) : (
                    "$0.00"
                  )}
                </h1>
              </div>
            </div>
            {/* Pay button */}
            <div className="mt-0">
              <div className="flex justify-between border-t-1 border-gray-300 py-4">
                <h1 className="text-2xl font-semibold text-[#4b5563]">Total</h1>
                <h1 className="text-2xl font-semibold text-[#4b5563]">
                  $
                  {getTotalDiscount()
                    ? (getTotal() - getTotalDiscount()).toFixed(2)
                    : getTotal().toFixed(2)}
                </h1>
              </div>
              {user && user.token ? (
                <button
                  disabled={!cart.length}
                  onClick={handleSaveOrder}
                  id={!cart.length ? "" : "button"}
                  className={`absolute w-full rounded py-4 text-xl font-semibold text-white ${
                    !cart.length
                      ? "cursor-not-allowed bg-indigo-300"
                      : "cursor-pointer bg-indigo-700"
                  } `}
                >
                  Check Out
                </button>
              ) : (
                <Link state="cart" to="/login">
                  <button
                    id="button"
                    className="absolute w-full cursor-pointer rounded bg-indigo-700 py-4 text-xl font-semibold text-white"
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
