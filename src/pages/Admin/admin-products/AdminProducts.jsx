import React from "react";
import { AdminLayout } from "../../../components";
import ProductsTable from "../../../components/base/tables/products-table";
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
      <div className="mt-5 flex justify-between items-center w-3/4">
        <span className="text-3xl ">مدیریت کالاها</span>
        <button className="bg-save text-white rounded-md font-thin py-2 px-4 shadow-2xl">
          افزودن کالا
        </button>
      </div>
      <ProductsTable data={data} columns={columns} />
    </AdminLayout>
  );
};
