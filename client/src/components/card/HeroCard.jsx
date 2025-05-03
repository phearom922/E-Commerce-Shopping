import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { toast } from "react-toastify";
// ============Add to Cart===================================
import { useSelector, useDispatch } from "react-redux";
//Lodash
import _ from "lodash";
// ============Add to Cart===================================




const HeroCard = ({ product, index }) => {
  const dispatch = useDispatch();
  const { title, images, description, _id } = product;

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));

      const isAlreadyInCart = cart.some((item) => item._id === product._id);
      if (isAlreadyInCart) {
        toast.error("There are products in the cart!");
        return;
      }

      toast.success("Add to Cart Success!");
    }

    cart.push({
      ...product,
      count: 1,
    });

    const unique = _.uniqWith(cart, _.isEqual);

    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
  };




  return (
    <div className="flex grid-cols-2 items-center justify-center py-8">
      <div className="flex h-full w-7xl items-center justify-center">
        <img
          src={images[0]?.url}
          alt="heroImage"
          className="h-96 object-cover"
        />
      </div>

      <div className="w-5xl space-y-4 py-2">
        <h1 className="text-gray-500">
          # {index + 1}{" "}
          <span className="bg-pink-500 px-1 text-white">New Product</span>
        </h1>
        <h1 className="text-6xl font-semibold">{title}</h1>
        <p className="min-h-24 text-gray-500">{description}</p>
        <div>
          <div className="flex justify-between items-center">
            <button
              onClick={handleAddToCart}
              id="button"
              className="relative cursor-pointer rounded bg-indigo-700 p-4 font-semibold text-white"
            >
              Add to Cart
            </button>
            <Link to={"/product-detail/" + _id}>
              <button className="flex cursor-pointer items-center justify-center gap-2 font-light hover:font-semibold">
                View Detail
                <FaLongArrowAltRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
