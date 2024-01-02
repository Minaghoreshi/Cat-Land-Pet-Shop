import React from "react";
import { MainCategory } from "./MainCategory";

import { useParams } from "react-router-dom";
export const CategoryPage = () => {
  const { id } = useParams();

  return (
    <div className="flex mt-8 gap-16">
      <MainCategory categoryId={id} />
    </div>
  );
};
