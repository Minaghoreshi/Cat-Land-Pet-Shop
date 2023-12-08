import React from "react";
import { useParams } from "react-router-dom";
import { CustomerLayout } from "../../../components";
export const Product = () => {
  const { category, productId } = useParams();
  return (
    <CustomerLayout>
      <div>this is products page</div>
      <div>the category is {category}</div>
      <div>the product id is {productId}</div>
    </CustomerLayout>
  );
};
