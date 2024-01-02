import React, { useState } from "react";
import { getProducts } from "../../../api/products/products-api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  StockTable,
  TableTitle,
  AdminLayout,
  PaginationComponent,
  Toastify,
} from "../../../components";
import { addMultipleEditedProduct } from "../../../api/products/products-api";
import { WithGuard } from "../../../components/widget/with-guard/withGuard";
const AdminStocks = () => {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [productData, setProductData] = useState(null);
  const [dataToSend, setDataToSend] = useState(null);
  const [toastifyVisible, setToastifyVisible] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryFn: () => {
      return getProducts(currentPage);
    },
    queryKey: ["products", { currentPage }],
    onSuccess: (data) => setProductData(data.data.products),
  });
  const { mutateAsync: addEditedDataMuttion } = useMutation({
    mutationFn: addMultipleEditedProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      setToastifyVisible((prev) => !prev);
    },
  });
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const save = async () => {
    try {
      await addEditedDataMuttion(dataToSend);
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
  const columns = [
    { key: "name", label: "کالا", width: "w-3/5" },
    { key: "price", label: "قیمت" },
    { key: "quantity", label: "موجودی" },
  ];

  return (
    <AdminLayout>
      {" "}
      {toastifyVisible ? (
        <Toastify
          text={"تغییرات با موفقیت ذخیره گردید"}
          color={"bg-success"}
          position={"top-[20%]"}
        />
      ) : (
        ""
      )}{" "}
      <div className="mt-5 flex justify-between items-center w-3/4">
        <TableTitle title={"مدیریت موجودی و قیمت"} />
        <button
          onClick={save}
          className="bg-save text-white rounded-md font-thin py-2 px-4 shadow-2xl"
        >
          ذخیره
        </button>{" "}
      </div>{" "}
      {productData ? (
        <StockTable
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
