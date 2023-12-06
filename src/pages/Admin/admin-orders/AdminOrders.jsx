import React from "react";
import { AdminLayout } from "../../../components/base/layouts/adminLayout/adminLayout";
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
        <span className="text-3xl ">مدیریت سفارشات </span>
        <div className="flex gap-10">
          <div className=" flex gap-3">
            {" "}
            <label>سفارش های ارسال شده</label>
            <input type="radio" />
          </div>
          <div className=" flex gap-3">
            {" "}
            <label>سفارش های در انتظار ارسال</label>
            <input type="radio" />
          </div>
        </div>
      </div>
      <ProductsTable
        data={data}
        columns={columns}
        buttonsArray={["بررسی سفارش"]}
      />
    </AdminLayout>
  );
};
