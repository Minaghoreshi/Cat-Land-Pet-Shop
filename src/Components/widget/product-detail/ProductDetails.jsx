import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../api/products/products-api";
import { Breadcrumb, Button, Card, Carousel } from "flowbite-react";
import { CustomBreadCrump } from "./CustomBreadCrump";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Counter from "./Counter";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const { data, error, isLoading } = useQuery(["product", id], () => {
    return getProductById(id);
  });
  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data, product]);
  if (product) {
    console.log(product);
  }
  return product ? (
    <div className="w-screen-3xl py-12 px-28 flex flex-col gap-20 ">
      {" "}
      <div className="flex gap-14">
        {" "}
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          style={{ margin: 0, maxWidth: "600px" }}
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={image}>
              <img
                src={`http://localhost:8000/images/products/images/${image}`}
                alt={`Slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex flex-col justify-between">
          <h1 className="text-primary text-3xl">{product.name}</h1>{" "}
          <CustomBreadCrump
            category={product.category.name}
            subcategory={product.subcategory.name}
          />
          <span className="text-lg text-xl">
            {" "}
            {` ${product.price.toLocaleString("en-US")} تومان`}
          </span>
          <div className="flex gap-20 items-center ">
            <Counter max={product.quantity} />
            <Button size="xl">افزودن به سبد خرید</Button>
          </div>
        </div>
        {product.quantity === 0 ? (
          <div className="flex flex-col justify-center">
            <span className="text-3xl text-selected">
              در حال حاضر این محصول موجود نیست
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col gap-7">
        <h2 className="text-primary text-3xl ">توضیحات محصول</h2>
        <p className="font-thin text-gray-500"> {product.description}</p>
      </div>
    </div>
  ) : (
    ""
  );
};
