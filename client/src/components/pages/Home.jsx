import React from "react";
import HeroPage from "../home/HeroPage";
import DiscountPage from "../home/DiscountPage";
import NewProduct from "../home/NewProduct";
import BastSeller from "../home/BastSeller";
import Footer from "../footer/Footer";

const Home = () => {

  return (
    <div>
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroPage />
        <DiscountPage />
        <NewProduct />
        <BastSeller />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
