import React from "react";
import { AdminLayout } from "../../../components/base/layouts/adminLayout/adminLayout";
import { TableTitle } from "../../../components/base/tables/TableTitle";
import { TableFilter } from "../../../components/base/tables/TableFilter";
import OrdersTable from "../../../components/base/tables/ordersTable";
import { getAllOrders } from "../../../api/orders/orders-api";
import { useQuery } from "react-query";
export const AdminOrders = () => {
  const { data, error, isLoading } = useQuery(["products"], () =>
    getAllOrders()
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }
  console.log(data.data.orders);
  const initial = [
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
    { key: "user", label: "نام کاربر" },
    { key: "totalPrice", label: "مجموع مبلغ" },
    { key: "createdAt", label: "زمان ثبت سفارش " },
  ];
  return (
    <AdminLayout>
      {" "}
      <div className="mt-5 flex justify-between items-center w-3/4">
        <TableTitle title={"مدیریت سفارش ها"} />
        <TableFilter />
      </div>
      <OrdersTable
        data={data.data.orders}
        columns={columns}
        buttonsArray={["بررسی سفارش"]}
      />
    </AdminLayout>
  );
};
