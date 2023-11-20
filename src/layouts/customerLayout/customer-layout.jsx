import React from "react";
import { CustomerFooter, CustomerHeader } from "../../Components";
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
