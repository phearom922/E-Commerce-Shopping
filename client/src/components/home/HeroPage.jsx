import React, { useState, useEffect } from "react";
import HeroCard from "../card/HeroCard";
import LoadingCard from "../card/LoadingCard";
import Loading from "../card/Loading"

//Slider=========
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";

import "swiper/css/autoplay";

//Motion
import {motion} from "framer-motion"


//Function
import { productListby } from "../functions/product";

const HeroPage = () => {
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
      {loading ? (
        <Loading className=""/>
      ) : (
        <motion.div
        initial={{opacity:0.5, translateX: 50}}
        whileInView={{opacity:1, translateX: 0}}
        transition={{duration:1}}
        viewport={{once:true}}
        >
          <Swiper
            className="w-full"
            spaceBetween={50}
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 3000 }}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <HeroCard product={item} key={item._id} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
    </div>
  );
};

export default HeroPage;
