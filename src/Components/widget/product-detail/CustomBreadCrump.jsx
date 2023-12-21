import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";

export const CustomBreadCrump = ({ category, subcategory }) => {
  return (
    <div className="flex gap-5 items-center">
      <span>{category}</span>
      {/* <MdArrowBackIosNew /> */}
      <span>{subcategory}</span>
    </div>
  );
};
