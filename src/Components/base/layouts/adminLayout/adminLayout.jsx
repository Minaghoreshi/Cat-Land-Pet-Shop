import React from "react";
import { AdminHeader } from "./adminHeader";
import { AdminFooter } from "./adminFooter";
export function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      {children}
      <AdminFooter />
    </>
  );
}