import React from "react";
import { CustomerFooter, CustomerMain, CustomerHeader } from "../../Components";
import { useParams } from "react-router-dom";
export default function CustomerLayout({ children }) {
  const { category, productId } = useParams();
  const categoryContainer = (
    <div>this is a category you selected: {category}</div>
  );
  const product = <div>this is a product you selected {productId}</div>;
  return (
    <>
      <CustomerHeader />
      {/* <CustomerMain /> */}
      {children}
      <CustomerFooter />
    </>
  );
}
