import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../api/products/products-api";
import { Breadcrumb, Button, Card } from "flowbite-react";
import { CustomBreadCrump } from "./CustomBreadCrump";
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
      <div className="flex gap-14">
        <img
          className="w-96 h-96 rounded-md"
          src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
          alt="product_image"
        />
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
          <div>
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
