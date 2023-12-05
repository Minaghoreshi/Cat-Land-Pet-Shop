import React from "react";
import { AdminHeader } from "./adminHeader";
export function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      {children}
      {/* <AdminFooter /> */}
    </>
  );
}
