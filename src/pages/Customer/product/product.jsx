import React from "react";
import { useParams } from "react-router-dom";
import { CustomerLayout, ProductDetails } from "../../../components";
const Product = () => {
  const { category, productId } = useParams();
  return (
    <CustomerLayout>
      <ProductDetails />
    </CustomerLayout>
  );
};
export default Product;
