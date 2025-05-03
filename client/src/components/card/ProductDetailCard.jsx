import React, { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Loading from "../card/Loading";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { addToWishlist } from "../functions/users";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import axios from "axios";
// ============Add to Cart===================================

const ProductDetailCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        if (response.data.images?.length > 0) {
          setMainImage(response.data.images[0].url);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);


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

  const handleAddToCartAndBuyNow = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));

      const isAlreadyInCart = cart.some((item) => item._id === product._id);
      if (isAlreadyInCart) {
        toast.error("Already in Cart!");
        navigate("/cart");
        return;
      }

      toast.success("Add to Cart Success!");
      navigate("/cart");
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

  // Add to Wishlist
  const handleAddToWishlist = (e) => {
    if (user) {
      addToWishlist(user.token, _id)
        .then((res) => {
          console.log(res.data);
          toast.success("Add to Wishlist Success!!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please login first!!");
    }
  };



  if (loading) return <Loading />;
  if (!product) return <div>Product not found. <button onClick={() => navigate('/')}>Back to Home</button></div>;

  const { _id, title, description, images, price, sold, category, quantity, productCode, discount } = product;

  return (
    <>
      <div className="flex mb-32 flex-col">
        <div className="flex-1">
          {product ? (
            <div className="grid grid-cols-2 justify-center">
              <div className="flex w-full grid-cols-1 justify-center">
                <div className="flex h-96 w-96 flex-col">
                  <img
                    src={mainImage || (images && images[0]?.url)}
                    alt="ImageDetail"
                    className="rounded-md bg-gray-100 object-cover"
                  />
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {images &&
                      images.map((images, index) => (
                        <img
                          onClick={() => setMainImage(images.url)}
                          key={index}
                          className="cursor-pointer rounded bg-gray-100 object-cover transition-all duration-200 hover:scale-105"
                          src={images.url}
                          alt="gallery"
                        />
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="space-y-2">
                  <h1 className="text-4xl font-semibold text-[#1f2937e6]">
                    {title}
                  </h1>
                  <p className="text-xs text-[#2b3646e6]">
                    Product Code :{" "}
                    <span className="text-[#1f293780]">{productCode}</span>
                  </p>
                  <h1 className="text-gray-500">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-0.5 text-pink-600">
                        <FaStar className="text-xs" />
                        <FaStar className="text-xs" />
                        <FaStar className="text-xs" />
                        <FaStar className="text-xs" />
                        <FaStarHalfAlt className="text-xs" />
                      </div>
                      <div>
                        <p className="text-[12px]">(4.5)</p>
                      </div>
                    </div>
                  </h1>
                  <p className="min-h-24 pb-4 text-gray-500">{description}</p>
                </div>

                <div>
                  <div className="py-2">
                    {discount ? (
                      <div className="flex space-x-4">
                        <span className="py-4 text-3xl font-medium text-[#1f2937e6]">
                          {price - (price * discount) / 100} usd{" "}
                        </span>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-xl text-pink-700 line-through">
                            {price?.toFixed(2)} usd
                          </span>
                          <p className="rounded bg-pink-200 px-2 py-2 text-red-600">
                            {-discount}%
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-3xl font-medium text-[#1f2937e6]">
                        {price?.toFixed(2)} usd
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-10 border-t-[0.8px] border-gray-300 py-5">
                    <div className="tex-[#1f2937e6] space-y-1">
                      <p>Category </p>
                      <p>Stock Quantity </p>
                      <p>Sold</p>
                    </div>
                    <div className="space-y-1 text-[#1f293780]">
                      <div>{category?.name}</div>
                      <div>
                        {quantity ? quantity + " pecs" : "Out ot stock"}
                      </div>
                      <div>{sold} pecs</div>
                    </div>
                  </div>

                  <div className="flex w-full gap-4">
                    <button
                      onClick={handleAddToWishlist}
                      id="button"
                      className="relative cursor-pointer rounded-xs bg-gray-200 p-4 font-semibold text-[#1f293780]"
                    >
                      <IoIosHeart size={30} className="text-pink-600" />
                    </button>
                    <button
                      disabled={quantity <= 0}
                      onClick={handleAddToCart}
                      id={quantity <= 0 ? "" : "button"}
                      className={`relative w-full cursor-${quantity <= 0 ? "not-allowed" : "pointer"} rounded-xs bg-gray-200 p-4 font-semibold text-[#1f293780]`}
                    >
                      Add to Cart
                    </button>

                    <button
                      disabled={quantity <= 0}
                      onClick={handleAddToCartAndBuyNow}
                      id={quantity <= 0 ? "" : "button"}
                      className={
                        quantity <= 0
                          ? "relative w-full cursor-not-allowed rounded-xs bg-indigo-300 p-4 font-semibold text-white"
                          : "relative w-full cursor-pointer rounded-xs bg-indigo-600 p-4 font-semibold text-white"
                      }
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailCard;
