import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  ProductsTable,
  TableTitle,
  TableButton,
  AdminLayout,
  PaginationComponent,
} from "../../../components";
import { getProducts } from "../../../api/products/products-api";
import {
  ProductTableCustomButtons,
  ProductTableTitle,
  ProductTableButton,
  ProductsTablecolumns,
} from "../constants";
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
