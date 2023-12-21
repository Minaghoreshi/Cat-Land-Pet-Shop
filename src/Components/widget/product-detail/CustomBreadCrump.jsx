import React from "react";
import { Icon } from "@iconify/react";

export const CustomBreadCrump = ({ category, subcategory }) => {
  return (
    <div className="flex gap-5 items-center">
      <span>{category}</span>

      <Icon icon="fluent:ios-arrow-24-regular" />
      <span>{subcategory}</span>
    </div>
  );
};
