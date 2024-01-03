import React from "react";
import { CustomCard } from "../../CustomCard";

export const CategorySection = ({ item }) => {
  return (
    <div className="flex  items-start" key={item._id}>
      <div className="flex gap-2 justify-center rounded-lg overflow-hidden border bg-secondary">
        {" "}
        {item.products?.slice(0, 6).map((product) => (
          <CustomCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};
