import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export const CustomCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Card
        className=" max-w-xs shadow-custom p-4 bg-gray-100 "
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
        </div>
      </Card>
    </Link>
  );
};
