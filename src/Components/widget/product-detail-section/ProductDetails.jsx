import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../api/products/products-api";
import "swiper/css";
import * as DOMPurify from "dompurify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { CustomSwiper } from "./Swiper";
import { ProductDescript } from "./ProductDescript";
export const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const { data } = useQuery(["product", id], () => {
    return getProductById(id);
  });
  const myRef = useRef();

  useEffect(() => {
    if (myRef.current && product) {
      const sanitizedHTML = DOMPurify.sanitize(product.description);
      myRef.current.innerHTML = sanitizedHTML;
    }
  }, [myRef, product]);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data, product]);

  return product ? (
    <div className="w-full h-screen py-12 bg-secondary flex  justify-center gap-20 ">
      <div className="bg-white w-2/3 p-8 rounded-lg flex flex-col gap-20  shadow-custom">
        {" "}
        <div className="flex gap-14">
          {" "}
          <CustomSwiper images={product.images} />
          <ProductDescript
            product={product}
            name={product.name}
            category={product.category.name}
            subcategory={product.subcategory.name}
            price={`${product.price.toLocaleString("en-US")}`}
            quantity={product.quantity}
          />
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
          <div
            className="text-gray-500"
            ref={myRef}
            dangerouslySetInnerHTML={{ __html: myRef.current?.innerHTML || "" }}
          ></div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
