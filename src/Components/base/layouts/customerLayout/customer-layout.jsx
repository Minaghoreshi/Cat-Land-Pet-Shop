import React from "react";
import { CustomerHeader } from "./customerHeader";

export function CustomerLayout({ children }) {
  return (
    <>
      <CustomerHeader />
      {children}
      {/* <CustomerFooter /> */}
    </>
  );
}
