import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import img1 from "../../../../assets/slider1.jpg";
import img2 from "../../../../assets/slider2.jpg";
import img3 from "../../../../assets/slider3.jpg";
import img4 from "../../../../assets/slider4.jpg";
import img5 from "../../../../assets/slider5.jpg";
const imagesArray = [img1, img2, img3, img4, img5];
export const Hero = ({ className }) => {
  return (
    <div className={`${className}`}>
      {" "}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {imagesArray.map((image, index) => (
          <SwiperSlide key={image}>
            <img
              className="rounded-lg"
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
