import React from "react";

import { Link } from "react-router-dom";

export const CustomCard = ({ product, className }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div
        className={`p-4 flex flex-col items-center w-[220px] h-[270px] gap-4 bg-white ${className}`}
      >
        <img
          className="h-28 w-28"
          src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
          alt="product-thumbnail"
        />
        <div className="flex flex-col h-[130px] w-full justify-between">
          {" "}
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
            {product.name}
          </h5>
          <span className="text-md font-bold text-selected dark:text-white">
            {` ${product.price.toLocaleString("en-US")} تومان`}
          </span>
        </div>
      </div>
    </Link>
  );
};
