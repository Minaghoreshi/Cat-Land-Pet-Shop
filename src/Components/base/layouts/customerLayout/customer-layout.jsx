import React from "react";
import { CustomerHeader } from "./customerHeader";
import { Container } from "../container";
export function CustomerLayout({ children }) {
  return (
    <Container>
      <CustomerHeader />
      {children}
      {/* <CustomerFooter /> */}
    </Container>
  );
}
