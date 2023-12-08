import React, { useEffect, useState } from "react";
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
import { getCategoryById } from "../../../api/category/category-api";
import { getSubCategoryById } from "../../../api/subcategory/subcategory-api";
import {
  ProductTableCustomButtons,
  ProductTableTitle,
  ProductTableButton,
  ProductsTablecolumns,
} from "../constants";
export const NewAdminProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [combinedData, setCombinedData] = useState();
  const {
    data: productsData,
    error,
    isLoading,
  } = useQuery(["productsData", currentPage], getProducts(currentPage));
  const dataCombine = async () => {
    if (productsData) {
      const dataWithCategoryAndSubcactegory =
        await combineProductsWithCategories(productsData.data.products);
      return dataWithCategoryAndSubcactegory;
    }
  };

  const {
    data: wholeData,
    error: combinedDataError,
    isLoading: combinedDataLoading,
  } = useQuery(["combinedData", currentPage], () => dataCombine(), {
    enabled: !!productsData, // Only fetch combined data when productsData is available
  });

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error fetching products</p>;
  }

  if (combinedDataLoading) {
    return <p>Loading combined data...</p>;
  }

  if (combinedDataError) {
    return <p>Error fetching combined data</p>;
  }

  // Now you can use wholeData in your component
  console.log(wholeData);
  return <p>test</p>;
};
