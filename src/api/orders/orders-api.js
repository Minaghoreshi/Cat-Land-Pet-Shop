import axios from "axios";
export const getAllOrders = async (page, deliveryStatus) => {
  const response = await axios.get(`http://localhost:8000/api/orders`, {
    params: {
      page,
      limit: 5,
      deliveryStatus,
    },
  });
  return response.data;
};
