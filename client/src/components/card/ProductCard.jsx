import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { BiCommentDots } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

//Lodash
import _ from "lodash";

// ==================loaddata==================

const ProductCard = ({ product }) => {
  const { title, price, images, description, _id, discount } = product;
  const dispatch = useDispatch();
  
//Add to Cart
  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));

      const isAlreadyInCart = cart.some((item) => item._id === product._id);
      if (isAlreadyInCart) {
        toast.error("Already in Cart!");
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
    <div className="group relative flex flex-col items-center justify-center space-y-2 rounded-xl bg-gray-100 p-4 shadow-sm hover:shadow-blue-200">
      <Link to={"/product-detail/" + _id}>
        {images?.length > 0 && images[0]?.url ? (
          <div className="flex h-45 w-45 cursor-pointer items-center justify-center">
            <img
              className="h-full transform object-cover transition-all duration-200 group-hover:scale-105"
              src={images[0].url}
              alt="Watch"
            />
          </div>
        ) : (
          <div className="flex h-45 w-45 items-center justify-center text-center text-red-700">
            No <br />
            Image
          </div>
        )}
      </Link>

      <div className="w-full space-y-2">
        <div className="flex w-full flex-col gap-0.5">
          <h1 className="text-md font-medium text-gray-600">{title}</h1>

          <p className="w-full truncate text-xs text-gray-500/70 max-sm:hidden">
            {description}
          </p>

          <div className="flex gap-2">
            <div className="flex text-pink-600">
              <FaStar className="text-[10px]" />
              <FaStar className="text-[10px]" />
              <FaStar className="text-[10px]" />
              <FaStar className="text-[10px]" />
              <FaStarHalfAlt className="text-[10px]" />
            </div>

            <div className="flex gap-0.5">
              <BiCommentDots className="text-[10px]" />
              <p className="text-[10px]">97</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="font-medium text-gray-600">
            {discount ? (
              <div className="flex flex-col">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs text-pink-700 line-through">
                    {price.toFixed(2)} usd
                  </span>
                  <p className="rounded bg-pink-300 p-0.5 text-xs text-pink-700">
                    {-discount}%
                  </p>
                </div>
                <span>{(price - (price * discount) / 100).toFixed(2)} usd</span>
              </div>
            ) : (
              <span>{price.toFixed(2)} usd</span>
            )}
          </h1>
          <button
            onClick={handleAddToCart}
            id="button"
            className="relative cursor-pointer rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white"
          >
            <FiShoppingCart className="text-2xl" />
          </button>
        </div>
      </div>
      {/* <div className="text-md absolute top-1.5 left-1.5 rounded-[6px] bg-pink-600 px-2 py-1 text-white">
          New
        </div> */}
    </div>
  );
};

export default ProductCard;
