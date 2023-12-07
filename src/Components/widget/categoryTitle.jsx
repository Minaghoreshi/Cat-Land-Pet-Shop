import React from "react";
import { getCategoryById } from "../../api/category/category-api";
import { getSubCategoryById } from "../../api/subcategory/subcategory-api";
import { useQuery } from "react-query";
export const CategoryandSubCategoryTitle = ({ product }) => {
  const { data: category, error: categoryError } = useQuery(
    ["category", product],
    () => {
      return getCategoryById(product.category);
    }
  );
  const { data: subCategory, error: subCategoryError } = useQuery(
    ["subCategory", product],
    () => {
      return getSubCategoryById(product.subcategory);
    }
  );
  console.log(subCategory);
  return <div>{`${category} / ${subCategory}`}</div>;
};
