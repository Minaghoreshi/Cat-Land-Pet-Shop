import React from "react";
import { CustomerHeader } from "./customerHeader";
import { Container } from "../container";
export function CustomerLayout({ children, className }) {
  return (
    <Container className="flex flex-col items-center">
      <CustomerHeader />
      {children}
      {/* <CustomerFooter /> */}
    </Container>
  );
}
