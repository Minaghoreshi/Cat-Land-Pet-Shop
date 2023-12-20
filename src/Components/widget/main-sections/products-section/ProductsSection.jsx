import React from "react";

import { CategorySection } from "./CategorySection";
export const ProductsSection = ({ menuItems }) => {
  return menuItems ? (
    <div className="flex pb-6 flex-col gap-5 px-9 max-w-screen-2xl max-height: 700px overflow-auto custom-scroll">
      {menuItems.map((item) => (
        <CategorySection item={item} />
      ))}
    </div>
  ) : null;
};
