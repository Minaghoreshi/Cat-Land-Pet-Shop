import React from "react";
import { useParams } from "react-router-dom";
import { MainSubCategory } from "./MainSubCategory";
export const SubCategoryPage = () => {
  const { id } = useParams();

  return (
    <div className="flex mt-8 gap-16">
      <MainSubCategory sub={id} />
    </div>
  );
};
