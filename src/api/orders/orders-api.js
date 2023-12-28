import api from "../axios";
export const getAllOrders = async (page, deliveryStatus) => {
  const response = await api.get(`http://localhost:8000/api/orders`, {
    params: {
      page,
      limit: 5,
      deliveryStatus,
    },
  });
  return response.data;
};
export const addMultipleOrders = async (ordersToAdd) => {
  try {
    const response = await api.post(
      `http://localhost:8000/api/orders`,
      ordersToAdd,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(response, "all orders added successfully");
  } catch (error) {
    console.log(error);
  }
};
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(
      `http://localhost:8000/api/orders/${orderId}`
    );
    return response.data.data.order;
  } catch (error) {
    console.log(error);
  }
};
