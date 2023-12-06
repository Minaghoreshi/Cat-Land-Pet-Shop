import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../components";
import { useQuery } from "react-query";
import ProductsTable from "../../../components/base/tables/products-table";
import { TableTitle } from "../../../components/base/tables/TableTitle";
import { TableButton } from "../../../components/base/tables/TableButton";
import { getProducts } from "../../../api/products/products-api";
export const AdminProducts = () => {
  const buttonsArray = ["ویرایش", "حذف"];

  const columns = [
    { key: "thumbnail", label: "تصویر" },
    { key: "name", label: "نام کالا" },
    { key: "category", label: "دسته بندی" },
  ];
  const { data, error, isLoading } = useQuery("products", () => getProducts(1));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }
  console.log(data);
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
