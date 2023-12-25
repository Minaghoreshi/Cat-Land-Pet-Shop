import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

export const CustomSwiper = ({ images }) => {
  return (
    <Swiper
      spaceBetween={50}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      style={{ margin: 0, maxWidth: "600px" }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={image}>
          <img
            src={`http://localhost:8000/images/products/images/${image}`}
            alt={`Slide ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
