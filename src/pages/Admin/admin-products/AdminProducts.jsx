import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../components";
import { useQuery } from "react-query";
import ProductsTable from "../../../components/base/tables/products-table";
import { TableTitle } from "../../../components/base/tables/TableTitle";
import { TableButton } from "../../../components/base/tables/TableButton";
import { getProducts } from "../../../api/products/products-api";
import {
  ProductTableCustomButtons,
  ProductTableTitle,
  ProductTableButton,
  ProductsTablecolumns,
} from "../constants";
import { PaginationComponent } from "../../../components/widget/pagination";
export const AdminProducts = () => {
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
  console.log(data);
  return (
    <AdminLayout>
      {" "}
      <div className="mt-5 flex justify-between items-center w-3/4">
        {" "}
        <TableTitle title={ProductTableTitle} />
        <TableButton button={ProductTableButton} />
      </div>
      {data.data && data.data.products ? (
        <ProductsTable
          data={data.data.products}
          columns={ProductsTablecolumns}
          buttonsArray={ProductTableCustomButtons}
        />
      ) : (
        <p>nothing to show</p>
      )}
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={data.total_pages}
      />
    </AdminLayout>
  );
};
