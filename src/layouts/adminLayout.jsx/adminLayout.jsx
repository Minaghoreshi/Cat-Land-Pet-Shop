import React from "react";
import {
  AdminFooter,
  AdminHeader,
  AdminMain,
} from "../../Components/widget/admin-widget";
export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <AdminMain />
      <AdminFooter />
    </>
  );
}
