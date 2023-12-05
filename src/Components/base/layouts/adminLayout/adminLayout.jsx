import React from "react";
import { AdminHeader } from "./adminHeader";
import { Container } from "../container";
export function AdminLayout({ children }) {
  return (
    <Container>
      <AdminHeader />
      {children}
      {/* <AdminFooter /> */}
    </Container>
  );
}
