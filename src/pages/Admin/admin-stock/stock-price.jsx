import React from "react";
import { AdminLayout } from "../../../components";
import { TableButton } from "../../../components/base/tables/TableButton";
import { TableTitle } from "../../../components/base/tables/TableTitle";
import StocksTable from "../../../components/base/tables/stocks-table";
export const AdminStocks = () => {
  const data = [
    {
      id: 1,
      product: "غذای خشک جوسرا سنسی کت",
      price: 1200000,
      quantity: 27,
    },
    {
      id: 2,
      product: "مالت پرسا",
      price: 70000,
      quantity: 124,
    },
    // ... more data
  ];

  const columns = [
    { key: "product", label: "کالا" },
    { key: "price", label: "قیمت" },
    { key: "quantity", label: "موجودی" },
  ];
  return (
    <AdminLayout>
      <div className="mt-5 flex justify-between items-center w-3/4">
        {" "}
        <TableTitle title={"مدیریت موجودی و قیمت"} />
        <TableButton button={"ذخیره "} />
      </div>{" "}
      <StocksTable data={data} columns={columns} />
    </AdminLayout>
  );
};
