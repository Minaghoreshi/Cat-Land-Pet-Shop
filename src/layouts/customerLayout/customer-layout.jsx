import React from "react";
import { CustomerFooter } from "./customerFooter";
import { CustomerHeader } from "./customerHeader";
export default function CustomerLayout({ children }) {
  return (
    <>
      <CustomerHeader />
      {children}
      <CustomerFooter />
    </>
  );
}
