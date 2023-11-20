import React from "react";
import { useParams } from "react-router-dom";
const Product = () => {
  const { category, productId } = useParams();
  return (
    <>
      <div>this is products page</div>
      <div>the category is {category}</div>
      <div>the product id is {productId}</div>
    </>
  );
};
export default Product;
