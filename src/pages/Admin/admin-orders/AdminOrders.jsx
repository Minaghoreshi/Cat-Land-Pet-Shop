import React, { useState } from "react";
import { AdminLayout } from "../../../components/base/layouts/adminLayout/adminLayout";
import { TableTitle } from "../../../components/base/tables/TableTitle";
import { TableFilter } from "../../../components/base/tables/TableFilter";
import OrdersTable from "../../../components/base/tables/ordersTable";
import { getAllOrders } from "../../../api/orders/orders-api";
import { useQuery } from "react-query";
import { PaginationComponent } from "../../../components/widget/pagination";
export const AdminOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery(["products", currentPage], () =>
    getAllOrders(currentPage)
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }
  const onPageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  console.log(data.data.orders);

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
      {data.data && data.data.orders ? (
        <OrdersTable
          data={data.data.orders}
          columns={columns}
          buttonsArray={["بررسی سفارش"]}
        />
      ) : (
        <p>No orders available</p>
      )}
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={data.total_pages}
      />
    </AdminLayout>
  );
};
