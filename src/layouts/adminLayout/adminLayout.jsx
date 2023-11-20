import React from "react";
import { AdminFooter, AdminHeader } from "../../Components/widget/admin-widget";
export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      {children}
      <AdminFooter />
    </>
  );
}
