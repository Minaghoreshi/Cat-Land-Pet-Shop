import React from "react";
import { CustomBreadCrump } from "./CustomBreadCrump";
import Counter from "./Counter";
import { Button } from "flowbite-react";

export const ProductDescript = ({
  name,
  category,
  subcategory,
  price,
  quantity,
}) => {
  return (
    <div className="flex flex-col justify-between">
      <h1 className="text-primary text-3xl">{name}</h1>{" "}
      <CustomBreadCrump category={category} subcategory={subcategory} />
      <span className="text-lg text-xl">{`${price} تومان`}</span>{" "}
      <div className="flex gap-20 items-center ">
        <Counter max={quantity} />
        <Button size="xl">افزودن به سبد خرید</Button>
      </div>
    </div>
  );
};
