// AdminStocks.js
import React, { useState } from "react";
import { AdminLayout } from "../../../components";
import { TableButton } from "../../../components/base/tables/TableButton";
import { TableTitle } from "../../../components/base/tables/TableTitle";
import { getProducts } from "../../../api/products/products-api";
import { useQuery } from "react-query";
import Table from "../../../components/base/tables/table";
import { PaginationComponent } from "../../../components/widget/pagination";

export const AdminStocks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useQuery(["products", currentPage], () =>
    getProducts(currentPage)
  );
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }

  const columns = [
    { key: "name", label: "کالا", width: "w-3/5" },
    { key: "price", label: "قیمت" },
    { key: "quantity", label: "موجودی" },
  ];

  return (
    <AdminLayout>
      <div className="mt-5 flex justify-between items-center w-3/4">
        <TableTitle title={"مدیریت موجودی و قیمت"} />
        <TableButton button={"ذخیره "} />
      </div>
      <Table data={data.data.products} columns={columns} />
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={data.total_pages}
      />
    </AdminLayout>
  );
};
