import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  TableTitle,
  TableFilter,
  OrdersTable,
  AdminLayout,
  PaginationComponent,
} from "../../../components";
import { getAllOrders } from "../../../api/orders/orders-api";
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
    ["orders", currentPage, deliveryStatus],
    () => getAllOrders(currentPage, deliveryStatus)
  );
  useEffect(() => {
    if (data) {
      setProductData(data.data.orders);
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      setProductData(data.data.orders);
    }
  }, [data, currentPage, deliveryStatus]);

  const handleStatusChange = (status) => {
    setDeliveryStatus(status);
  };
  if (isLoading || productData === null) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

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
