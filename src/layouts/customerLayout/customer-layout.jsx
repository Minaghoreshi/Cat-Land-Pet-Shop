import React from "react";
import { CustomerFooter, CustomerHeader } from "../../components";
export default function CustomerLayout({ children }) {
  return (
    <>
      <CustomerHeader />
      {/* <CustomerMain /> */}
      {children}
      <CustomerFooter />
    </>
  );
}
