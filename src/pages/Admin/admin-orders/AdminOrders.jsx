import React from "react";
import { AdminLayout } from "../../../components/base/layouts/adminLayout/adminLayout";
import { TableTitle } from "../../../components/base/tables/TableTitle";
import { TableFilter } from "../../../components/base/tables/TableFilter";
import ProductsTable from "../../../components/base/tables/products-table";
export const AdminOrders = () => {
  const data = [
    { id: 1, name: "مینا قرشی", total: "۲۶۰۰۰۰۰", date: "۱۴۰۲/۰۹/۱۰" },
    {
      id: 2,
      name: "صادق دارابی",
      total: "۱۵۰۰۰۰",
      date: "۱۴۰۲/۰۹/۰۱",
    },
    // ... more data
  ];

  const columns = [
    { key: "name", label: "نام کاربر" },
    { key: "total", label: "مجموع مبلغ" },
    { key: "date", label: "زمان ثبت سفارش " },
  ];
  return (
    <AdminLayout>
      {" "}
      <div className="mt-5 flex justify-between items-center w-3/4">
        <TableTitle title={"مدیریت سفارش ها"} />
        <TableFilter />
      </div>
      <ProductsTable
        data={data}
        columns={columns}
        buttonsArray={["بررسی سفارش"]}
      />
    </AdminLayout>
  );
};
