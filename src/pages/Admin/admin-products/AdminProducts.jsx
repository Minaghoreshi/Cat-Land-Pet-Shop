import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  ProductsTable,
  TableTitle,
  AdminLayout,
  PaginationComponent,
  WithGuard,
  AddModal,
} from "../../../components";
import { getProducts } from "../../../api/products/products-api";
import { combineProductsWithCategories } from "./utils";
import {
  ProductTableCustomButtons,
  ProductTableTitle,
  ProductsTablecolumns,
} from "../constants";

const AdminProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [wholeData, setWholeData] = useState();
  const { data, isLoading, error } = useQuery({
    queryFn: () => {
      return getProducts(currentPage);
    },
    queryKey: ["products", { currentPage }],
    onSuccess: (data) => getDataDetails(data),
  });

  const getDataDetails = async (data) => {
    const combinedData = await combineProductsWithCategories(
      data.data.products
    );
    setWholeData(combinedData);
  };

  //for pagination changing
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
      <div className="mt-5 flex justify-between items-center w-3/4">
        {" "}
        <TableTitle title={ProductTableTitle} />
        <AddModal />
      </div>
      {data.data && wholeData ? (
        <ProductsTable
          data={wholeData}
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
export default WithGuard(AdminProducts);
