import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { IoIosHeart } from "react-icons/io";
import { toast } from "react-toastify";
import { getWishlist, removeWishlist } from "../../functions/users";
import { Link, useNavigate } from "react-router-dom";
//Lodash
import _ from "lodash";
// ============Add to Cart===================================

const Wishlist = () => {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });
  };

  const handleRemove = (productId) => {
    removeWishlist(user.token, productId).then((res) => {
      console.log(res.data);
      loadData();
    });
  };

  //Add to Cart
  const handleAddToCart = (product) => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
  
    const isAlreadyInCart = cart.some((item) => item._id === product._id);
    if (isAlreadyInCart) {
      toast.error("There are products in the cart!");
      return;
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
  
    toast.success("Add to Cart Success!");
    // ลบออกจาก Wishlist ทันทีหลังเพิ่มในตะกร้า
    
    handleRemove(product._id);
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between text-xl font-semibold text-gray-600">
          <div className="flex items-center gap-2 py-5 text-2xl font-semibold text-gray-600">
            Wishlist <IoIosHeart />{" "}
          </div>
          <div>Love ({wishlist.length})</div>
        </div>
        {wishlist.length > 0 ? (
          <div className="space-y-6 rounded-2xl border border-gray-200 p-8">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-center gap-4 border-b border-indigo-100 pb-6 sm:flex-row"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-indigo-50">
                  <Link to={"/product-detail/" + item._id}>
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="h-16 w-16 object-contain"
                    />
                  </Link>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="font-medium text-indigo-700">
                    ${item.price.toFixed(2)}
                  </p>
                  <p
                    className={
                      item.quantity > 0
                        ? "text-xs text-green-600"
                        : "text-xs text-red-500"
                    }
                  >
                    Stock Quantity :{" "}
                    {item.quantity <= 0 ? "OutStock" : item.quantity}
                  </p>
                </div>
                <div className="flex flex-row gap-2 sm:flex-col">
                  <button
                    onClick={() => handleRemove(item._id)}
                    variant="outline"
                    size="icon"
                    className="cursor-pointer rounded-md border border-indigo-200 p-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={()=>handleAddToCart(item)}
                    variant="outline"
                    size="icon"
                    className="cursor-pointer rounded border border-indigo-200 p-2 text-indigo-700 hover:bg-indigo-50"
                    disabled={item.quantity === 0}
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <Heart className="mx-auto mb-4 h-16 w-16 text-indigo-200" />
            <h3 className="mb-2 text-xl font-medium">
              Your favorites list is empty
            </h3>
            <p className="mb-6 text-indigo-600">
              Select the products you are interested in and add them to your
              favorites.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="cursor-pointer rounded-md bg-indigo-700 p-4 text-white hover:bg-indigo-800"
            >
              Shop Now!!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
