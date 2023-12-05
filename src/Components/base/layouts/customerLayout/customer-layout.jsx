import React from "react";
import { CustomerFooter } from "./customerFooter";
import { CustomerHeader } from "./customerHeader";
import { Container } from "@mui/material";
export function CustomerLayout({ children }) {
  return (
    <>
      <CustomerHeader />
      {children}
      {/* <CustomerFooter /> */}
    </>
  );
}
