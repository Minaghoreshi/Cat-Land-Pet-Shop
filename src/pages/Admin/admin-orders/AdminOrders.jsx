import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  ordersTableButton,
  OrdersTableTitle,
} from "../constants";
import { combineUsersWithOrders } from "./usersandorders";
import { WithGuard } from "../../../components/widget/with-guard/withGuard";
import { getUserById } from "../../../api/users/users-api";
const AdminOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersData, setOrdersData] = useState();
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  //get orders data
  const { data, error, isLoading } = useQuery({
    queryFn: () => {
      return getAllOrders(currentPage, deliveryStatus);
    },
    queryKey: ["orders", currentPage, deliveryStatus],
  });

  const getOrdersWithUsers = useCallback(async () => {
    if (data) {
      console.log(data);
      const combinedData = await combineUsersWithOrders(data.data.orders);
      setOrdersData(combinedData);
    }
  }, [data, setOrdersData]);

  const memoizedGetOrdersWithUsers = useMemo(
    () => getOrdersWithUsers,
    [getOrdersWithUsers]
  );

  useEffect(() => {
    memoizedGetOrdersWithUsers();
  }, [memoizedGetOrdersWithUsers]);

  const handleStatusChange = (status) => {
    setDeliveryStatus(status);
  };
  if (isLoading || ordersData === null) {
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
          setCurrentPage={setCurrentPage}
          handleStatusChange={handleStatusChange}
          deliveryStatus={deliveryStatus}
        />
      </div>
      {ordersData ? (
        <OrdersTable
          data={ordersData}
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
export default WithGuard(AdminOrders);
