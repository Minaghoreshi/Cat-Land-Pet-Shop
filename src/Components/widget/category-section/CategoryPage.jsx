import React from "react";
import { MainCategory } from "./MainCategory";

import { useParams } from "react-router-dom";
export const CategoryPage = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center pt-4 gap-16 no-scrollbar overflow-auto custom-scroll">
      <MainCategory categoryId={id} />
    </div>
  );
};
