import React, { useState, useEffect } from "react";
import ProductDetailCard from "../card/ProductDetailCard";
import BastSeller from "../home/BastSeller"
//function
import { readProduct } from "../functions/product";
import { useParams } from "react-router-dom";
import Footer from "../footer/Footer";

const ProductDetail = () => {
  const param = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    //
    loadData();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }, [param]);

  const loadData = () => {
    readProduct(param.id)
      .then((res) => {
        //
        setProduct(res.data);
      })
      .catch((err) => {
        //
        console.log(err.response);
      });
  };
  return (
    <div >
      <div className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductDetailCard product={product} />
      </div>
      <div className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <BastSeller />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
