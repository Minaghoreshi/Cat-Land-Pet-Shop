import React from "react";
// import { AdminFooter, AdminHeader } from "../../components/widget/admin-widget";
import { AdminHeader } from "./adminHeader";
import { AdminFooter } from "./adminFooter";
export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      {children}
      <AdminFooter />
    </>
  );
}
