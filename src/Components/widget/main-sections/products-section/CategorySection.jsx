import React from "react";
import { CustomCard } from "../../CustomCard";

export const CategorySection = ({ item }) => {
  return (
    <div
      className="flex flex-col gap-7  bg-[#fbf7f9] shadow-custom py-5 rounded-lg items-center"
      key={item._id}
    >
      <h1 className="font-bold text-[30px] text-primary hover:underline underline-offset-8 hover:text-selected">
        {item.name}
      </h1>
      <div className="flex flex-wrap gap-16 justify-center">
        {" "}
        {item.products?.slice(0, 6).map((product) => (
          <CustomCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};
