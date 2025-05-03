import React, { useState, useEffect } from "react";
import ProductCard from "../card/ProductCard";
import LoadingCard from "../card/LoadingCard";
//Function
import { productListby } from "../functions/product";
//Motion
import { motion } from "framer-motion";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    productListby("createdAt", "desc", 5)
      .then((res) => {
        ///
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div>
      <div className="w-full">
        <div className="py-10">
          <h1 className="text-xl font-semibold text-[#374151]">
            New<span className="border-b-3 border-pink-700"> Products</span>
          </h1>
        </div>

        {/*============ Product Card================*/}
        <div>
          {loading ? (
            <LoadingCard count={5} />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.25, 0.25, 0.75],
                delay: 0.2,
              }}
              // viewport={{ once: true }}

              className="grid grid-cols-5 gap-4 pb-10"
            >
              {products.map((item) => (
                <ProductCard product={item} key={item._id} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
