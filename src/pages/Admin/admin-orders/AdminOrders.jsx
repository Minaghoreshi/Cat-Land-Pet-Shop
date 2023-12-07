import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../components/base/layouts/adminLayout/adminLayout";
import { TableTitle } from "../../../components/base/tables/TableTitle";
import { TableFilter } from "../../../components/base/tables/TableFilter";
import OrdersTable from "../../../components/base/tables/ordersTable";
import { getAllOrders } from "../../../api/orders/orders-api";
import { useQuery } from "react-query";
import { PaginationComponent } from "../../../components/widget/pagination";
import {
  ordersColumns,
  OrdersTableTitle,
  ordersTableButton,
} from "../constants";
export const AdminOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productData, setProductData] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const { data, error, isLoading } = useQuery(
    ["products", currentPage, deliveryStatus],
    () => getAllOrders(currentPage, deliveryStatus)
  );
  useEffect(() => {
    if (data) {
      setProductData(data.data.orders);
    }
  }, [data]);
  const handleStatusChange = (status) => {
    setDeliveryStatus(status);
    setCurrentPage(1);
  };
  if (isLoading || productData === null) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }
  const onPageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  console.log(data.data.orders);

  return (
    <AdminLayout>
      {" "}
      <div className="mt-5 flex justify-between items-center w-3/4">
        <TableTitle title={OrdersTableTitle} />
        <TableFilter
          handleStatusChange={handleStatusChange}
          deliveryStatus={deliveryStatus}
        />
      </div>
      {productData ? (
        <OrdersTable
          data={productData}
          columns={ordersColumns}
          buttonsArray={ordersTableButton}
        />
      ) : (
        <p>No orders available</p>
      )}
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={data.total_pages}
      />
    </AdminLayout>
  );
};
