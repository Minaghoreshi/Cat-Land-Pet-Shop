import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

export const CustomSwiper = ({ images }) => {
  console.log(images);
  return (
    <Swiper
      style={{ margin: 0 }}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      className="w-[400px] m-0"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={`http://localhost:8000/images/products/images/${image}`}
            alt={`Slide ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
