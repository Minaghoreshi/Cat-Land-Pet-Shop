// AdminStocks.js
import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../components";
import { TableButton } from "../../../components/base/tables/TableButton";
import { TableTitle } from "../../../components/base/tables/TableTitle";
import { getProducts } from "../../../api/products/products-api";
import { useQuery } from "react-query";
import Table from "../../../components/base/tables/table";
import { PaginationComponent } from "../../../components/widget/pagination";

export const AdminStocks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productData, setProductData] = useState(null);
  const { data, error, isLoading } = useQuery(["products", currentPage], () =>
    getProducts(currentPage)
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Update the state when data changes
    if (data) {
      setProductData(data.data.products);
    }
  }, [data]);

  // Check for loading state or if productData is null
  if (isLoading || productData === null) {
    return <p>Loading...</p>;
  }

  // Check for error state
  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }
  console.log(data.data.products);
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
      {productData ? (
        <Table data={productData} columns={columns} />
      ) : (
        <p>loading</p>
      )}

      <PaginationComponent
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={data.total_pages}
      />
    </AdminLayout>
  );
};
