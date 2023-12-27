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
    // const promises = ordersToAdd.map(async (order) => {
    const response = await api.post(
      `http://localhost:8000/api/orders`,
      ordersToAdd,
      { headers: { "Content-Type": "application/json" } }
    );
    // return response;
    // };
    // const addedOrders = await Promise.all(promises);
    console.log(response, "all orders added successfully");
  } catch (error) {
    console.log(error);
  }
};
