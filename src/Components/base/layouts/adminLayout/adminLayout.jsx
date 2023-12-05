import React from "react";
import { AdminHeader } from "./adminHeader";
import { AdminFooter } from "./adminFooter";
import { Container } from "@mui/material";
export function AdminLayout({ children }) {
  return (
    <Container>
      <AdminHeader />
      {children}
      {/* <AdminFooter /> */}
    </Container>
  );
}
