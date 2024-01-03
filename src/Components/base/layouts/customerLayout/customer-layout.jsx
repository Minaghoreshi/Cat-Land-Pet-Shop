import React from "react";
import { CustomerHeader } from "./customerHeader";
import { Container } from "../container";
export function CustomerLayout({ children, className }) {
  return (
    <Container className=" relative flex flex-col items-center overflow-hidden max-h-screen ">
      <CustomerHeader className={"absolute top-0"} />
      {children}
    </Container>
  );
}
