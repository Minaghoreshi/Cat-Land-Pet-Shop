import React from "react";
import { AdminLayout } from "../../../components";
import ProductsTable from "../../../components/base/tables/products-table";
import { TableTitle } from "../../../components/base/tables/TableTitle";
import { TableButton } from "../../../components/base/tables/TableButton";
export const AdminProducts = () => {
  const buttonsArray = ["حذف", "ویرایش"];
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
      <div className="mt-5 flex justify-between items-center w-3/4">
        {" "}
        <TableTitle title={"مدیریت کالا"} />
        <TableButton button={"افزودن کالا"} />
      </div>
      <ProductsTable
        data={data}
        columns={columns}
        buttonsArray={buttonsArray}
      />
    </AdminLayout>
  );
};
