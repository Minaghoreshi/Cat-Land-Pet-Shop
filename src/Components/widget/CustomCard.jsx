import React from "react";
import { Card } from "flowbite-react";

export const CustomCard = ({ product }) => {
  return (
    <Card
      className="max-w-sm max-w-xs shadow-custom p-4 bg-gray-100 "
      imgAlt="product-thumbnail"
      imgSrc={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
    >
      <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
        {product.name}
      </h5>

      <div className="flex items-center justify-between">
        <span className="text-md font-bold text-gray-500 dark:text-white">
          {` ${product.price.toLocaleString("en-US")} تومان`}
        </span>
        <button className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
          افزودن به سبد
        </button>
      </div>
    </Card>
  );
};
