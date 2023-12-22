import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/products/products-api";
import { QueryClient, useQuery } from "react-query";
import {
  Table,
  TableTitle,
  AdminLayout,
  PaginationComponent,
} from "../../../components";
import { addMultipleEditedProduct } from "../../../api/products/products-api";
import { WithGuard } from "../../../components/widget/with-guard/withGuard";
const AdminStocks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productData, setProductData] = useState(null);
  const [dataToSend, setDataToSend] = useState(null);
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

  const save = async () => {
    try {
      const result = await addMultipleEditedProduct(dataToSend);
      if (result && result === 200) {
        QueryClient.invalidateQueries("products");
      }
    } catch (error) {
      console.log(error.response.status);
    }
  };

  // Check for loading state or if productData is null
  if (isLoading || productData === null) {
    return <p>Loading...</p>;
  }

  // Check for error state
  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }
  // console.log(data.data.products);
  const columns = [
    { key: "name", label: "کالا", width: "w-3/5" },
    { key: "price", label: "قیمت" },
    { key: "quantity", label: "موجودی" },
  ];

  return (
    <AdminLayout>
      <div className="mt-5 flex justify-between items-center w-3/4">
        <TableTitle title={"مدیریت موجودی و قیمت"} />
        <button
          onClick={save}
          className="bg-save text-white rounded-md font-thin py-2 px-4 shadow-2xl"
        >
          ذخیره
        </button>{" "}
      </div>
      {productData ? (
        <Table
          data={productData}
          columns={columns}
          setDataToSend={setDataToSend}
        />
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
export default WithGuard(AdminStocks);
