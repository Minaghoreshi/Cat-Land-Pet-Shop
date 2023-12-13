import axios from "axios";
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
