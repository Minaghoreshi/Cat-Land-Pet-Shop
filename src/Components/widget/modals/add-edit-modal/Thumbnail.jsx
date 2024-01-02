import React from "react";
import { TiDelete } from "react-icons/ti";

export const Thumbnail = ({ handleThumbnailDelete, productThumbnail }) => {
  return (
    <div className="mt-3 flex gap-3 flex-wrap">
      <div className="relative">
        <TiDelete
          className="w-8 absolute z-10 top-0 h-8 cursor-pointer"
          onClick={handleThumbnailDelete}
        />
        <img
          className="w-24 h-24 border"
          alt={`product-${productThumbnail}`}
          src={`http://localhost:8000/images/products/thumbnails/${productThumbnail}`}
        />
      </div>{" "}
    </div>
  );
};
