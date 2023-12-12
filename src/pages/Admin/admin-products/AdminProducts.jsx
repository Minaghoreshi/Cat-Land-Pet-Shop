/* eslint-disable react-hooks/rules-of-hooks */

import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  ProductsTable,
  TableTitle,
  TableButton,
  AdminLayout,
  PaginationComponent,
} from "../../../components";
import { getProducts } from "../../../api/products/products-api";
import { combineProductsWithCategories } from "./dataCombining";

import {
  ProductTableCustomButtons,
  ProductTableTitle,
  ProductTableButton,
  ProductsTablecolumns,
} from "../constants";
import { WithGuard } from "../../../components/widget/with-guard/withGuard";
const AdminProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [wholeData, setWholeData] = useState();

  //get all products (without category and subcategory)
  const { data, error, isLoading } = useQuery(["products", currentPage], () =>
    getProducts(currentPage)
  );
  //pass the data and get subcategpory and category and store in the wholedata state
  const getDataDetails = useCallback(async () => {
    if (data) {
      const combinedData = await combineProductsWithCategories(
        data.data.products
      );
      setWholeData(combinedData);
    }
  }, [data]);
  //run use effect whenever data changes so that getting category and sub category be done
  useEffect(() => {
    getDataDetails();
  }, [data, getDataDetails]);

  //for pagination changing
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  // console.log(wholeData);
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
        <TableButton button={ProductTableButton} />
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
