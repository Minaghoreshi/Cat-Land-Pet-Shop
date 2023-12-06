import React from "react";
import { AdminLayout } from "../../../components";
import ProductsTable from "../../../components/base/tables/products-table";
import { TableTitle } from "../../../components/base/tables/TableTitle";
export const AdminProducts = () => {
  const data = [
    { id: 1, image: "ندارد", name: "غذای خشک جوسرا سنسی کت", category: "غذا" },
    { id: 2, image: "ندارد", name: "مالت پرسا", category: "وسایل جانبی" },
    // ... more data
  ];

  const columns = [
    { key: "image", label: "تصویر" },
    { key: "name", label: "نام کالا" },
    { key: "category", label: "دسته بندی" },
  ];
  return (
    <AdminLayout>
      {" "}
      <TableTitle button={"فزودن کالا"} title={"مدیریت کالا"} />
      <ProductsTable data={data} columns={columns} />
    </AdminLayout>
  );
};
